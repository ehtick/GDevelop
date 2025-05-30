namespace gdjs {
  /**
   * The PIXI.js renderer for the BBCode Text runtime object.
   */
  export class BBTextRuntimeObjectPixiRenderer {
    _object: gdjs.BBTextRuntimeObject;
    _pixiObject: MultiStyleText;

    /**
     * @param runtimeObject The object to render
     * @param instanceContainer The gdjs.RuntimeInstanceContainer in which the object is
     */
    constructor(
      runtimeObject: gdjs.BBTextRuntimeObject,
      instanceContainer: gdjs.RuntimeInstanceContainer
    ) {
      this._object = runtimeObject;

      this._pixiObject = new MultiStyleText(runtimeObject._text, {
        default: {
          fontFamily: instanceContainer
            .getGame()
            .getFontManager()
            .getFontFamily(runtimeObject._fontFamily),
          fontSize: runtimeObject._fontSize + 'px',
          fill: gdjs.rgbToHexNumber(
            runtimeObject._color[0],
            runtimeObject._color[1],
            runtimeObject._color[2]
          ),
          tagStyle: 'bbcode',
          wordWrap: runtimeObject._wrapping,
          wordWrapWidth: runtimeObject._wrappingWidth,
          align: runtimeObject._textAlign as PIXI.TextStyleAlign | undefined,
        },
      });
      instanceContainer
        .getLayer('')
        .getRenderer()
        .addRendererObject(this._pixiObject, runtimeObject.getZOrder());

      this.updateAlignment();
      this.updateText();
      this.updatePosition();
      this.updateAngle();
      this.updateOpacity();
    }

    getRendererObject() {
      return this._pixiObject;
    }

    updateWordWrap(): void {
      //@ts-ignore Private member usage.
      this._pixiObject._style.wordWrap = this._object._wrapping;
      this._pixiObject.dirty = true;
      this.updatePosition();
    }

    updateWrappingWidth(): void {
      //@ts-ignore Private member usage.
      this._pixiObject._style.wordWrapWidth = this._object._wrappingWidth;
      this._pixiObject.dirty = true;
      this.updatePosition();
    }

    updateText(): void {
      this._pixiObject.text = this._object._text;
      this.updatePosition();
    }

    updateColor(): void {
      //@ts-ignore Private member usage.
      this._pixiObject.textStyles.default.fill = gdjs.rgbToHexNumber(
        this._object._color[0],
        this._object._color[1],
        this._object._color[2]
      );
      this._pixiObject.dirty = true;
    }

    updateAlignment(): void {
      //@ts-ignore Private member usage.
      this._pixiObject._style.align = this._object._textAlign;
      this._pixiObject.dirty = true;
    }

    updateFontFamily(): void {
      //@ts-ignore Private member usage.
      this._pixiObject.textStyles.default.fontFamily = this._object
        .getInstanceContainer()
        .getGame()
        .getFontManager()
        .getFontFamily(this._object._fontFamily);
      this._pixiObject.dirty = true;
    }

    updateFontSize(): void {
      //@ts-ignore Private member usage.
      this._pixiObject.textStyles.default.fontSize =
        this._object._fontSize + 'px';
      this._pixiObject.dirty = true;
    }

    updatePosition(): void {
      if (this._object.isWrapping() && this._pixiObject.width !== 0) {
        const alignmentX =
          this._object._textAlign === 'right'
            ? 1
            : this._object._textAlign === 'center'
              ? 0.5
              : 0;

        const width = this._object.getWrappingWidth();

        // A vector from the custom size center to the renderer center.
        const centerToCenterX =
          (width - this._pixiObject.width) * (alignmentX - 0.5);

        this._pixiObject.position.x = this._object.x + width / 2;
        this._pixiObject.anchor.x =
          0.5 - centerToCenterX / this._pixiObject.width;
      } else {
        this._pixiObject.position.x =
          this._object.x + this._pixiObject.width / 2;
        this._pixiObject.anchor.x = 0.5;
      }

      const alignmentY =
        this._object._verticalTextAlignment === 'bottom'
          ? 1
          : this._object._verticalTextAlignment === 'center'
            ? 0.5
            : 0;
      this._pixiObject.position.y =
        this._object.y + this._pixiObject.height * (0.5 - alignmentY);
      this._pixiObject.anchor.y = 0.5;
    }

    updateAngle(): void {
      this._pixiObject.rotation = gdjs.toRad(this._object.angle);
    }

    updateOpacity(): void {
      this._pixiObject.alpha = this._object._opacity / 255;
    }

    getWidth(): float {
      return this._pixiObject.width;
    }

    getHeight(): float {
      return this._pixiObject.height;
    }

    destroy(): void {
      this._pixiObject.destroy(true);
    }
  }

  export const BBTextRuntimeObjectRenderer = BBTextRuntimeObjectPixiRenderer;
  export type BBTextRuntimeObjectRenderer = BBTextRuntimeObjectPixiRenderer;
}
