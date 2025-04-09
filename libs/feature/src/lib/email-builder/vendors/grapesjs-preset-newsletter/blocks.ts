export const addCustomBlocks = (editor: any) => {
  const addBlock = (blockName: string, block: any) => {
    editor.BlockManager.add(blockName, block);
  };
  const addComponent = (type: string, component: any) => {
    editor.DomComponents.addType(type, component);
  };

  // #region product-card
  // addBlock('product-card', {
  //   label: 'Product Card',
  //   media: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 122.88 114.58">
  //             <path d="M118.13,9.54a3.25,3.25,0,0,1,2.2.41,3.28,3.28,0,0,1,2,3l.57,78.83a3.29,3.29,0,0,1-1.59,3L89.12,113.93a3.29,3.29,0,0,1-2,.65,3.07,3.07,0,0,1-.53,0L3.11,105.25A3.28,3.28,0,0,1,0,102V21.78H0A3.28,3.28,0,0,1,2,18.7L43.89.27h0A3.19,3.19,0,0,1,45.63,0l72.5,9.51Zm-37.26,1.7-24.67,14,30.38,3.88,22.5-14.18-28.21-3.7Zm-29,20L50.75,64.62,38.23,56.09,25.72,63.17l2.53-34.91L6.55,25.49V99.05l77.33,8.6V35.36l-32-4.09Zm-19.7-9.09L56.12,8,45.7,6.62,15.24,20l16.95,2.17ZM90.44,34.41v71.12l25.9-15.44-.52-71.68-25.38,16Z"/>
  //           </svg>`,
  //   content: {
  //     type: 'product-card',
  //   },
  // });

  // addComponent('product-card', {
  //   isComponent: (el: any): any => {
  //     if (el.classList && el.classList.contains('product-card')) {
  //       return { type: 'product-card' };
  //     }
  //   },
  //   model: {
  //     defaults: {
  //       tagName: 'div',
  //       attributes: { class: 'product-card' },
  //       name: 'Product Card',
  //       droppable: false,
  //       propagate: ['removable', 'draggable', 'droppable'],
  //       components: `<img id="i4pj9" data-gjs-type="image" src="https://assets-cdp-stg.s3.eu-west-1.amazonaws.com/templates/1727259331-product-placeholder.png" style="max-width: 100%; height: 170px; margin: auto; display: block;" class="">
  //       <h2  style="font-size: 18px; margin-bottom: 8px;" class="product-title">Product Title</h2>
  //       <p  style="font-size: 16px; margin-bottom: 8px;" class="">Product Description</p><p data-gjs-highlightable="true" id="ix9wv" data-gjs-type="text" style="font-size: 16px; margin-bottom: 8px;" contenteditable="true" class="">$0.00</p><a data-gjs-highlightable="true" id="ir4a8" data-gjs-type="link" style="margin:24px 12px; padding: 12px 24px; border-radius: 8px; background-color: #3B82F6; color: white; text-decoration: none; cursor: pointer;">Buy now</a></div>`,
  //     },
  //   },
  //   view: {
  //     onRender() {
  //       // console.log('Product component rendered');
  //     },
  //   },
  // });

  // #endregion product-card

  // #region overide Button
  editor.BlockManager.get('button').set({
    label: 'Button',
    content: `
      <div
       style="padding: 10px; margin: 10px 0; text-align: center;">
       <a style="
        padding: 12px 24px;
        border-radius: 8px;
        background-color: #3B82F6;
        color: #fff;
        border: none;
        font-size: 16px;
        cursor: pointer;
        display:inline-block;
      ">Click me</a></div>
  `,
  });
  // #endregion overide Button

  //#region overide Image
  editor.BlockManager.get('image').set({
    label: 'Image',
    content: `
    <div style="padding: 10px; margin: 10px 0; text-align: center;">
      <img style="max-width:200px; max-height:200px;display:inline;" id="iua2" data-gjs-type="image" draggable="true" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIHZpZXdCb3g9IjAgMCAyNCAyNCIgc3R5bGU9ImZpbGw6IHJnYmEoMCwwLDAsMC4xNSk7IHRyYW5zZm9ybTogc2NhbGUoMC43NSkiPgogICAgICAgIDxwYXRoIGQ9Ik04LjUgMTMuNWwyLjUgMyAzLjUtNC41IDQuNSA2SDVtMTYgMVY1YTIgMiAwIDAgMC0yLTJINWMtMS4xIDAtMiAuOS0yIDJ2MTRjMCAxLjEuOSAyIDIgMmgxNGMxLjEgMCAyLS45IDItMnoiPjwvcGF0aD4KICAgICAgPC9zdmc+" class="gjs-plh-image gjs-selected">
    </div>
  `,
  });
  //#endregion overide Image

  //#region overide Text

  // editor.DomComponents.addType('text', {
  //   isComponent: (el: any) => el.tagName === 'TEXT', // Adjust as necessary

  //   model: {
  //     defaults: {
  //       traits: [
  //         {
  //           type: 'button',
  //           name: 'store-url',
  //           label: 'Store URL',
  //           text: 'Store URL',
  //           command: (editor: any) => injectText(editor, '{{store_url}}'),
  //         },
  //         {
  //           type: 'button',
  //           name: 'customer-first-name',
  //           label: 'Customer First Name',
  //           text: 'Customer First Name',
  //           command: (editor: any) =>
  //             injectText(editor, '{{customer_first_name}}'),
  //         },
  //         {
  //           type: 'button',
  //           name: 'cart-link',
  //           label: 'Cart Link',
  //           text: 'Cart Link',
  //           command: (editor: any) => injectText(editor, '{{cart_link}}'),
  //         },
  //         {
  //           type: 'button',
  //           name: 'store-name',
  //           label: 'Store Name',
  //           text: 'Store Name',
  //           command: (editor: any) => injectText(editor, '{{store_name}}'),
  //         },
  //       ],
  //     },
  //   },
  //   view: {
  //     handleInputUpdate(ev: any) {
  //       (this as any).model.components(ev.target.value);
  //     },

  //     onRender() {
  //       const el = (this as any).el;
  //       el.addEventListener('input', this.handleInputUpdate.bind(this));
  //       el.setAttribute('contenteditable', 'true');
  //     },
  //   },
  // });
  // function injectText(editor: any, text: string) {
  //   const selectedComponent = editor.getSelected();
  //   const iframeDoc = editor.Canvas.getDocument();

  //   if (selectedComponent && selectedComponent.is('text')) {
  //     const el = selectedComponent.getEl() as HTMLElement;
  //     const selection = iframeDoc.getSelection();

  //     if (selection.rangeCount > 0) {
  //       const range = selection.getRangeAt(0);

  //       range.deleteContents();
  //       const textNode = iframeDoc.createTextNode(text);
  //       range.insertNode(textNode);

  //       range.setStartAfter(textNode);
  //       range.setEndAfter(textNode);
  //       selection.removeAllRanges();

  //       selectedComponent.view.model.components(el.innerHTML);
  //     }
  //   }
  // }
  //#endregion overide Text

  //#region add unsubscribe link
  addBlock('unsubscribe-link', {
    label: 'Unsubscribe',
    media: `<svg  viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M3.28034 2.21968C2.98745 1.92678 2.51257 1.92677 2.21968 2.21966C1.92678 2.51255 1.92677 2.98743 2.21966 3.28032L3.4698 4.53049C2.5846 5.11112 2 6.11229 2 7.25001V16.75L2.00514 16.9344C2.10075 18.6436 3.51697 20 5.25 20H18.75L18.9339 19.9949L20.7194 21.7805C21.0123 22.0734 21.4872 22.0734 21.7801 21.7805C22.073 21.4876 22.073 21.0127 21.7801 20.7198L3.28034 2.21968ZM17.439 18.5H5.25L5.10647 18.4942C4.20711 18.4212 3.5 17.6682 3.5 16.75V9.37401L11.6507 13.6637L11.7468 13.706C11.9431 13.7764 12.1619 13.7623 12.3493 13.6637L12.5154 13.5763L17.439 18.5ZM10.0825 11.1433L3.5 7.67901V7.25001L3.5058 7.10648C3.55977 6.44167 3.9853 5.88191 4.57445 5.63516L10.0825 11.1433Z" fill="currentColor"/>
<path d="M20.5 7.67801L14.1844 11.0026L15.2949 12.1131L20.5 9.37301V16.75L20.4942 16.8935C20.4843 17.0152 20.462 17.1334 20.4285 17.2468L21.5621 18.3804C21.8405 17.9012 22 17.3442 22 16.75V7.25001L21.9949 7.06559C21.8992 5.35646 20.483 4.00001 18.75 4.00001H7.18195L8.68192 5.50001H18.75L18.8935 5.50581C19.7929 5.57882 20.5 6.33184 20.5 7.25001V7.67801Z" fill="currentColor"/>
</svg>`,
    content:
      '<div style="text-align:center"><a style="text-decoration:none;" href="https://unsubscribe.url" target="_blank">unsubscribe</a></div>',
  });
  //#endregion add unsubscribe link
};
