import { Directive, NgZone, OnInit } from '@angular/core';
declare const FreshworksWidget: any;

@Directive({
  selector: '[convertedinChatWidgetMovement]',
  standalone: true,
})
export class ChatWidgetMovementDirective implements OnInit {
  readonly LONG_CLICK_THRESHOLD = 300;
  clickTimer!: any;
  isInit = false;

  constructor(private zone: NgZone) {}

  ngOnInit(): void {
    this.zone.runOutsideAngular(() => {
      const observer = new MutationObserver((mutationsList) => {
        for (const mutation of mutationsList) {
          if (mutation.type === 'childList') {
            const widgetContainer = document.querySelector(
              '#freshworks-container'
            ) as HTMLElement;
            if (widgetContainer && !this.isInit) {
              const isRTL = getComputedStyle(document.body).direction === 'rtl';
              if (isRTL) {
                widgetContainer.style.left = `10px`;
                widgetContainer.style.right = 'unset';
              } else {
                widgetContainer.style.right = `10px`;
                widgetContainer.style.left = 'unset';
              }
              observer.disconnect();
              this.initWidgetListeners(widgetContainer);
              this.observeResize(widgetContainer);
              this.isInit=true;
            }
          }
        }
      });
      observer.observe(document.body, { childList: true, subtree: true });
    });
  }

  initWidgetListeners(widgetContainer: HTMLElement) {
    let startX: number, startY: number, initialX: number, initialY: number;
    let isDragging = false;
    let isLongPress = false;

    // Determine if the layout is RTL
    const isRTL = getComputedStyle(document.body).direction === 'rtl';

    widgetContainer.addEventListener('click', () => {
      if (!isLongPress) {
        FreshworksWidget('open');
      }
      isLongPress = false;
    });

    widgetContainer.addEventListener('pointerdown', (e) => {
      isDragging = true;
      startX = e.clientX;
      startY = e.clientY;
      initialX = widgetContainer.offsetLeft;
      initialY = widgetContainer.offsetTop;
      widgetContainer.style.cursor = 'grabbing';
      widgetContainer.setPointerCapture(e.pointerId);

      this.clickTimer = setTimeout(() => {
        isLongPress = true;
      }, this.LONG_CLICK_THRESHOLD);
    });

    widgetContainer.addEventListener('pointermove', (e) => {
      if (isDragging && isLongPress) {
        e.preventDefault();
        const moveX = e.clientX - startX;
        const moveY = e.clientY - startY;

        const newPos = {
          left: Math.max(
            0,
            Math.min(
              window.innerWidth - widgetContainer.offsetWidth - 6,
              initialX + moveX
            )
          ),
          top: Math.max(
            0,
            Math.min(
              window.innerHeight - widgetContainer.offsetHeight - 6,
              initialY + moveY
            )
          ),
        };

        if (isRTL) {
          widgetContainer.style.right = `${
            window.innerWidth - newPos.left - widgetContainer.offsetWidth
          }px`;
          widgetContainer.style.left = 'unset';
        } else {
          widgetContainer.style.left = `${newPos.left}px`;
          widgetContainer.style.right = 'unset';
        }

        widgetContainer.style.top = `${newPos.top}px`;
      }
    });

    widgetContainer.addEventListener('pointerup', (e) => {
      isDragging = false;
      widgetContainer.style.cursor = 'grab';
      widgetContainer.releasePointerCapture(e.pointerId);
      clearTimeout(this.clickTimer);

      const viewportWidth = window.innerWidth;
      const widgetWidth = widgetContainer.offsetWidth;
      const currentPos =
        parseInt(
          isRTL ? widgetContainer.style.right : widgetContainer.style.left,
          10
        ) || 0;
      const snapThreshold = viewportWidth / 2;

      if (isRTL) {
        widgetContainer.style.right =
          currentPos < snapThreshold
            ? '0px'
            : `${viewportWidth - widgetWidth}px`;
        widgetContainer.style.left = 'unset';
      } else {
        widgetContainer.style.left =
          currentPos < snapThreshold
            ? '0px'
            : `${viewportWidth - widgetWidth}px`;
        widgetContainer.style.right = 'unset';
      }
    });
  }
  observeResize(widgetContainer: HTMLElement) {
    window.addEventListener('resize', () => {
      const isRTL = getComputedStyle(document.body).direction === 'rtl';
      const viewportWidth = window.innerWidth;
      const widgetWidth = widgetContainer.offsetWidth;

      // Recalculate the left or right position based on the resized viewport
      const currentPos =
        parseInt(
          isRTL ? widgetContainer.style.right : widgetContainer.style.left,
          10
        ) || 0;

      if (isRTL) {
        widgetContainer.style.right =
          Math.min(currentPos, viewportWidth - widgetWidth - 6) + 'px';
        widgetContainer.style.left = 'unset';
      } else {
        widgetContainer.style.left =
          Math.min(currentPos, viewportWidth - widgetWidth - 6) + 'px';
        widgetContainer.style.right = 'unset';
      }
    });
  }
}
