import "./src/styles/tailwind.css";
import "./src/styles/index.scss";

// Styling for the preview modals.
import "gatsby-plugin-prismic-previews/dist/styles.css";

import {
  _wrapRootElement,
  _wrapPageElement,
  _onClientEntry,
} from "./wrapPageElement";

export const wrapRootElement = _wrapRootElement;
export const wrapPageElement = _wrapPageElement;
export const onClientEntry = _onClientEntry;
