import { CSSProperties } from 'react';

/**
 * Interface representing the class names for various elements in the RFW (React File Widget) slots modal.
 * These class names can be used to style the corresponding elements.
 *
 * @interface RFW_SlotsClassNames
 * @property {string} [root] - Class name for the root element.
 * @property {string} [header] - Class name for the header element.
 * @property {string} [content] - Class name for the content element.
 * @property {string} [videoContainer] - Class name for the video container element.
 * @property {string} [playButton] - Class name for the play button element.
 * @property {string} [error] - Class name for the error element.
 * @property {string} [loading] - Class name for the loading element.
 */
export interface RFW_SlotsClassNames {
  root?: string;
  header?: string;
  content?: string;
  videoContainer?: string;
  playButton?: string;
  error?: string;
  loading?: string;
}

/**
 * Interface representing the style properties for different slots in the React File Widget.
 * Each property corresponds to a specific part of the widget and allows for custom styling.
 */
export interface RFW_SlotStyleProps {
  /**
   * Style properties for the root element of the slot.
   */
  root?: CSSProperties;

  /**
   * Style properties for the header element of the slot.
   */
  header?: CSSProperties;

  /**
   * Style properties for the content element of the slot.
   */
  content?: CSSProperties;

  /**
   * Style properties for the video container element of the slot.
   */
  videoContainer?: CSSProperties;

  /**
   * Style properties for the play button element of the slot.
   */
  playButton?: CSSProperties;

  /**
   * Style properties for the error element of the slot.
   */
  error?: CSSProperties;

  /**
   * Style properties for the loading element of the slot.
   */
  loading?: CSSProperties;
}
