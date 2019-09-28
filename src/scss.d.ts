declare module "*.scss" {
    export const _insertCss: () => void;
    export const _getCss: () => string;
  }
  