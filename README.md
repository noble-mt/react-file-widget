
react-file-widget is a highly customizable file viewing component that seamlessly integrates into your application. It supports multiple file formats, allowing you to configure which renderers to include, thereby optimizing your build size. Unused renderers are excluded from your bundle, saving space. Additionally, you can add custom renderers or override existing ones to suit your needs.


## Features

- **Multiple File Formats**: Supports a wide range of file formats including images, videos, PDFs, and more.
- **Customizable Renderers**: Easily configure which renderers to include, optimizing your build size by excluding unused renderers.
- **Custom Renderers**: Add or override existing renderers to fit your specific needs.
- **Theming**: Supports both light and dark themes for better integration with your application.
- **Responsive Design**: Adjust the width, height, and maximum height of the component to fit different screen sizes.
- **Header Customization**: Option to hide the header or provide a custom header renderer function.
- **Video Controls**: Extensive video properties including autoplay, loop, mute, and more.
- **Image Rendering**: Choose between 'cover' and 'best-fit' modes for image rendering.
- **PDF Viewing**: Advanced PDF viewing options including pagination, zoom, rotation, and custom page controls.
- **Twitch Integration**: Embed Twitch streams with customizable parent domain.
- **Class Names and Styles**: Apply custom class names and styles to different slots for better styling control.


## Installation

````bash
// with npm
npm i  react-file-widget

// with yarn
yarn add react-file-widget
````
## Demo && Documentation
[Demo and Documentation](https://rfw-demo.netlify.app/)
## Usage
# Properties Table

| Property       | Possible Values                          | Description |
|---------------|----------------------------------|-------------|
| **file**      | `RFW_File`                      | At least `url` or `file` or (`data` and `fileType`) is required. |
| ├── url       | `string`                         | The URL of the file. |
| ├── fileType  | `string`                         | The type of the file (e.g., `image/png`, `application/pdf`). |
| ├── data      | `string`                         | The data of the file, typically in base64 format. |
| ├── language  | `RFW_Languages`                  | The language of the file content, if applicable. |
| ├── title     | `string`                         | The title of the file. |
| ├── fileName  | `string`                         | The name of the file. |
| ├── file      | `File`                           | The file object. |
| **classNames** | `RFW_SlotsClassNames`            | Custom class names for different slots. |
| ├── root      | `string`                         | Class name for the root element. |
| ├── header    | `string`                         | Class name for the header element. |
| ├── content   | `string`                         | Class name for the content element. |
| ├── videoContainer | `string`                   | Class name for the video container element. |
| ├── playButton | `string`                        | Class name for the play button element. |
| ├── error     | `string`                         | Class name for the error element. |
| ├── loading   | `string`                         | Class name for the loading element. |
| **slotProps** | `RFW_SlotStyleProps`             | Custom style properties for different slots. |
| ├── root      | `CSSProperties`                  | Style properties for the root element of the slot. |
| ├── header    | `CSSProperties`                  | Style properties for the header element of the slot. |
| ├── content   | `CSSProperties`                  | Style properties for the content element of the slot. |
| ├── videoContainer | `CSSProperties`            | Style properties for the video container element. |
| ├── playButton | `CSSProperties`                 | Style properties for the play button element. |
| ├── error     | `CSSProperties`                  | Style properties for the error element. |
| ├── loading   | `CSSProperties`                  | Style properties for the loading element. |
| **renderers** | `RFW_FileRenderer[]`             | Custom renderers for the file. |
| **width**     | `string`                         | Width of the component. |
| **height**    | `string`                         | Height of the component. |
| **maxHeight** | `string`                         | Maximum height of the component. |
| **theme**     | `'light' | 'dark'`               | Theme of the component. |
| **hideHeader** | `Boolean`                        | Whether to hide the header. _(default: `false`)_ |
| **customHeader** | `(document: RFW_File, config: ContextProps) => ReactNode` | Custom header renderer function. |
| **videoProps** |                                  | Properties for video. |
| ├── hideControls | `Boolean`                     | Whether to hide video controls. _(default: `false`)_ |
| ├── muted     | `Boolean`                        | Whether the video should be muted. _(default: `false`)_ |
| ├── autoplay  | `Boolean`                        | Whether the video should autoplay. _(default: `false`)_ |
| ├── noCookie  | `Boolean`                        | Whether to use no-cookie mode. |
| ├── disableKeyBoard | `Boolean`                 | Whether to disable keyboard controls. _(default: `false`)_ |
| ├── hideFullScreen | `Boolean`                  | Whether to hide the full-screen button. _(default: `false`)_ |
| ├── loop      | `Boolean`                        | Whether the video should loop. _(default: `false`)_ |
| ├── disableInlineOnMobile | `Boolean`          | Whether to disable inline playback on mobile devices. _(default: `false`)_ |
| ├── start     | `number`                         | The start time of the video in seconds. |
| ├── disablePreLoad | `Boolean`                  | Whether to disable preloading of the video. _(default: `false`)_ |
| ├── poster    | `string`                         | The URL of the poster image to be used as a thumbnail. |
| ├── posterQuality | `'low' | 'medium' | 'high'` | The quality of the poster image when fetched from video sharing sites. |
| **imageProps** |                                  | Properties for image. |
| ├── pictureMode | `'cover' | 'best-fit'`         | The mode to use for rendering the image. _(default: `best-fit`)_ |
| **twitchProps** |                                | Properties for Twitch. |
| ├── parent    | `string`                         | The parent domain for the Twitch embed. |
| **pdfProps**  |                                  | Properties for PDF. |
| ├── currentPage | `number`                      | The current page number. _(default: `0`)_ |
| ├── zoom      | `number`                         | The zoom level. |
| ├── paginated | `Boolean`                        | Whether the PDF should be paginated. _(default: `false`)_ |
| ├── mode      | `'single_page_view'`            | The mode to use for rendering the PDF. _(default: `single_page_view`)_ |
| ├── rotation  | `number`                         | The rotation angle of the PDF. |
| ├── onLoad    | `(totalPages: number) => void`   | Callback function to be called when the PDF is loaded. |
| ├── hidePageSelector | `Boolean`                | Whether to hide the page selector. _(default: `false`)_ |
| ├── pageSelectorPosition | `'left' | 'right' | 'bottom' | 'top'` | The position of the page selector. _(default: `left`)_ |
| ├── hidePageControls | `Boolean`               | Whether to hide the page controls. _(default: `false`)_ |
| ├── hideZoomControls | `Boolean`               | Whether to hide the zoom controls. _(default: `false`)_ |
| ├── hideRotateControls | `Boolean`             | Whether to hide the rotate controls. _(default: `false`)_ |
