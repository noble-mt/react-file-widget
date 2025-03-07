import { RFW_FileRenderer } from 'modals';
import { useGetConfig, useGetDocument } from '../../utils/context-helpers';
import { WrapperContainer } from './../../shared/wrapper-contr';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

const ImageRender: RFW_FileRenderer = () => {
  const document = useGetDocument();
  const config = useGetConfig();
  const imageContainerRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const [imageDate, setImageData] = useState<string>('');
  const scaleUp = true;
  const zoomFactor = 8;

  const [containerWidth, setContainerWidth] = useState<number>(0);
  const [containerHeight, setContainerHeight] = useState<number>(0);

  const [imageNaturalWidth, setImageNaturalWidth] = useState<number>(0);
  const [imageNaturalHeight, setImageNaturalHeight] = useState<number>(0);

  const imageScale = useMemo(() => {
    let scale = 0;
    if (containerWidth !== 0 && containerHeight !== 0 && imageNaturalWidth !== 0 && imageNaturalHeight !== 0) {
      scale =
        config?.imageProps?.pictureMode === 'cover'
          ? Math.max(containerWidth / imageNaturalWidth, containerHeight / imageNaturalHeight)
          : Math.min(containerWidth / imageNaturalWidth, containerHeight / imageNaturalHeight);
    } else if (containerWidth !== 0 && imageNaturalWidth !== 0) {
      scale = containerWidth / imageNaturalWidth;
    } else {
      return 0;
    }
    return scaleUp ? scale : Math.max(scale, 1);
  }, [
    scaleUp,
    containerWidth,
    containerHeight,
    imageNaturalWidth,
    imageNaturalHeight,
    config?.imageProps?.pictureMode,
  ]);

  const recHeight = useMemo(() => {
    return `${(imageNaturalHeight * containerWidth) / imageNaturalWidth}px`;
  }, [containerWidth, imageNaturalHeight, imageNaturalWidth]);

  const handleResize = useCallback(() => {
    if (imageContainerRef?.current !== null) {
      const rect = imageContainerRef?.current?.getBoundingClientRect();
      setContainerWidth(rect?.width ?? 0);
      setContainerHeight(rect?.height ?? 0);
    } else {
      setContainerWidth(0);
      setContainerHeight(0);
    }
  }, []);

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [handleResize]);

  const handleImageOnLoad = (image: HTMLImageElement) => {
    setImageNaturalWidth(image.naturalWidth);
    setImageNaturalHeight(image.naturalHeight);
  };

  useEffect(() => {
    if (document?.url) {
      const image = new Image();
      image.onload = () => handleImageOnLoad(image);
      image.src = document.url;
    } else if (document?.file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          const image = new Image();
          image.onload = () => handleImageOnLoad(image);
          image.src = e.target.result as string;
          setImageData(e.target.result as string);
        }
      };
      reader.readAsDataURL(document.file);
    } else if (document?.data) {
      const image = new Image();
      image.onload = () => handleImageOnLoad(image);
      image.src = document.data as string;
      setImageData(document.data);
    }
  }, [document?.url]);

  console.log('scale', imageScale, containerWidth, imageNaturalWidth, containerHeight);

  return (
    <WrapperContainer
      config={{ ...config, height: config?.height ?? recHeight }}
      className={config?.classNames?.content}
      ref={imageContainerRef}
    >
      {imageScale > 0 && (
        <TransformWrapper
          key={`${containerWidth}x${containerHeight}`}
          initialScale={imageScale}
          minScale={imageScale}
          maxScale={imageScale * zoomFactor}
        >
          <TransformComponent
            wrapperStyle={{
              width: config?.width ?? '100%',
              height: config?.height ?? recHeight ?? '100%',
            }}
          >
            <img ref={imageRef} src={document?.url ?? imageDate} />
          </TransformComponent>
        </TransformWrapper>
      )}
    </WrapperContainer>
  );
};

export default ImageRender;

ImageRender.supportedFileTypes = [
  'jpeg',
  'jpg',
  'bmp',
  'png',
  'gif',
  'svg',
  'image/bmp',
  'image/jpg',
  'image/jpeg',
  'image/png',
  'image/gif',
];
