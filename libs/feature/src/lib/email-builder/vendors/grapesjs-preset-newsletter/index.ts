import grapejsNewsLetter from 'grapesjs-preset-newsletter';
import { addStyleManagerSectors } from './styles-manager';
import { addCustomBlocks } from './blocks';

export const customPlugin=(editor:any)=>{
    grapejsNewsLetter(editor,{
    modalLabelImport: 'Paste all your code here below and click import',
    modalLabelExport: 'Copy the code and use it wherever you want',
    codeViewerTheme: 'material',
    importPlaceholder:
      '<table class="table"><tr><td class="cell">Hello world!</td></tr></table>',
    cellStyle: {
      'font-size': '12px',
      'font-weight': '300',
      'vertical-align': 'top',
      color: 'rgb(111, 119, 125)',
      margin: '0',
      padding: '0',
    },
  })
  addCustomBlocks(editor);
  addStyleManagerSectors(editor)
}