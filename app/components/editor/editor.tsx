import CodeEditor from '@uiw/react-textarea-code-editor';

import { getTemplate, getTemplateHTML } from 'app/common/utils';
import styles from './editor.module.scss';

interface IPreviewProps {
  resolution: number;
  zoom: number;
  backgroundColor: string;
  color: string;
  boxShadow: string;
}

const Preview = ({
  backgroundColor,
  boxShadow,
  color,
  resolution,
  zoom,
}: IPreviewProps) => {
  const template = getTemplate(
    {
      backgroundColor,
      boxShadow,
      color,
      pixels: resolution,
      zoom,
    },
    false,
    '/* template.css */\n\n'
  );

  const templateHtml = getTemplateHTML('<!-- template.html -->\n\n');

  return (
    <>
      <div className={`${styles['editor-wrapper']} ${styles['html-editor']}`}>
        <div className={styles['editor-inner']}>
          <div className={styles['editor-content']}>
            <CodeEditor
              value={templateHtml}
              language="html"
              readOnly={true}
              padding={15}
              style={{
                fontSize: '1rem',
                fontFamily:
                  'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
              }}
            ></CodeEditor>
          </div>
        </div>
      </div>

      <div className={`${styles['editor-wrapper']} ${styles['css-editor']}`}>
        <div className={styles['editor-inner']}>
          <div className={styles['editor-content']}>
            <CodeEditor
              value={template}
              language="css"
              readOnly={true}
              padding={15}
              style={{
                fontSize: '1rem',
                fontFamily:
                  'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
              }}
            ></CodeEditor>
          </div>
        </div>
      </div>
    </>
  );
};

export default Preview;
