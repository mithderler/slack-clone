import React, { useCallback, useMemo } from 'react';
import isHotkey from 'is-hotkey';
import { Editable, withReact, Slate, useSlate } from 'slate-react';
import { createEditor, Editor, Transforms } from 'slate';
import { withHistory } from 'slate-history';
import db from '../../firebase/config';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth } from 'firebase/auth';
import { app } from '../../firebase/config';

import Box from '@mui/material/Box';
import CodeIcon from '@mui/icons-material/Code';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import LooksOneIcon from '@mui/icons-material/LooksOne';
import LooksTwoIcon from '@mui/icons-material/LooksTwo';
import ToggleButton from '@material-ui/lab/ToggleButton';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import TextFormatIcon from '@mui/icons-material/TextFormat';
import SendIcon from '@mui/icons-material/Send';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import './SlateTextEditor.css';

const auth = getAuth(app);

const HOTKEYS = {
  'mod+b': 'bold',
  'mod+i': 'italic',
  'mod+u': 'underline',
  'mod+`': 'code',
};

const SlateTextEditor = ({ value, setValue, channelId, channelName }) => {
  const renderElement = useCallback((props) => <Element {...props} />, []);
  const renderLeaf = useCallback((props) => <Leaf {...props} />, []);
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);
  const [user] = useAuthState(auth);

  const sendMessage = (e) => {
    if (channelId) {
      addDoc(collection(db, 'rooms', channelId, 'messages'), {
        message: value[0]?.children[0]?.text,
        timestamp: serverTimestamp(),
        user: user.displayName,
        userImage: user.photoURL,
      }).then((res) => {
        Transforms.delete(editor, {
          at: {
            anchor: Editor.start(editor, []),
            focus: Editor.end(editor, []),
          },
        });
      });
    }
  };

  return (
    <Box className='text-editor'>
      <Slate
        editor={editor}
        value={value}
        onChange={(value) => {
          setValue(value);
        }}
      >
        <FormattingToolbar className='text-editor__formatting-bar'>
          <MarkButton format='bold'>
            <FormatBoldIcon className='text-editor--icon text-editor__formatting-bar--icon' />
          </MarkButton>
          <MarkButton
            format='italic'
            className='text-editor__formatting-bar--button'
          >
            <FormatItalicIcon className='text-editor--icon text-editor__formatting-bar--icon' />
          </MarkButton>
          <MarkButton
            format='underline'
            className='text-editor__formatting-bar--button'
          >
            <FormatUnderlinedIcon className='text-editor--icon text-editor__formatting-bar--icon' />
          </MarkButton>
          <MarkButton
            format='code'
            className='text-editor__formatting-bar--button'
          >
            <CodeIcon className='text-editor--icon text-editor__formatting-bar--icon' />
          </MarkButton>
          <BlockButton
            format='heading-one'
            className='text-editor__formatting-bar--button'
          >
            <LooksOneIcon className='text-editor--icon text-editor__formatting-bar--icon' />
          </BlockButton>
          <BlockButton
            format='heading-two'
            className='text-editor__formatting-bar--button'
          >
            <LooksTwoIcon className='text-editor--icon text-editor__formatting-bar--icon' />
          </BlockButton>
          <BlockButton
            format='block-quote'
            className='text-editor__formatting-bar--button'
          >
            <FormatQuoteIcon className='text-editor--icon text-editor__formatting-bar--icon' />
          </BlockButton>
          <BlockButton
            format='numbered-list'
            className='text-editor__formatting-bar--button'
          >
            <FormatListNumberedIcon className='text-editor--icon text-editor__formatting-bar--icon' />
          </BlockButton>
          <BlockButton
            format='bulleted-list'
            className='text-editor__formatting-bar--button'
          >
            <FormatListBulletedIcon className='text-editor--icon text-editor__formatting-bar--icon' />
          </BlockButton>
        </FormattingToolbar>
        <Box className='text-editor__input-box'>
          <Editable
            className='text-editor__input'
            renderElement={renderElement}
            renderLeaf={renderLeaf}
            placeholder={`Send a message to #${channelName}`}
            spellCheck
            autoFocus
            onKeyDown={(event) => {
              for (const hotkey in HOTKEYS) {
                if (isHotkey(hotkey, event)) {
                  event.preventDefault();
                  const mark = HOTKEYS[hotkey];
                  toggleMark(editor, mark);
                }
              }
              if (event.key === 'Enter') {
                sendMessage();
              }
            }}
          />
        </Box>
        <FoooterToolbar className='text-editor__footer-bar'>
          <MarkButton format='bold'>
            <AddCircleIcon className='text-editor--icon text-editor__footer-bar--icon' />
          </MarkButton>
          <MarkButton
            format='italic'
            className='text-editor__footer-bar--button'
          >
            <SentimentSatisfiedAltIcon className='text-editor--icon text-editor__footer-bar--icon' />
          </MarkButton>
          <MarkButton
            format='underline'
            className='text-editor__footer-bar--button'
          >
            <AlternateEmailIcon className='text-editor--icon text-editor__footer-bar--icon' />
          </MarkButton>
          <MarkButton
            format='underline'
            className='text-editor__footer-bar--button'
          >
            <TextFormatIcon className='text-editor--icon text-editor__footer-bar--icon' />
          </MarkButton>
          <MarkButton
            format='underline'
            className='text-editor__footer-bar--button'
          >
            <SendIcon className='text-editor--icon text-editor__footer-bar--icon' />
          </MarkButton>
          <MarkButton
            format='underline'
            className='text-editor__footer-bar--button'
          >
            <ExpandMoreIcon className='text-editor--icon text-editor__footer-bar--icon' />
          </MarkButton>
        </FoooterToolbar>
      </Slate>
    </Box>
  );
};

export const Element = ({ attributes, children, element }) => {
  switch (element.type) {
    case 'block-quote':
      return <blockquote {...attributes}>{children}</blockquote>;
    case 'bulleted-list':
      return <ul {...attributes}>{children}</ul>;
    case 'heading-one':
      return <h1 {...attributes}>{children}</h1>;
    case 'heading-two':
      return <h2 {...attributes}>{children}</h2>;
    case 'list-item':
      return <li {...attributes}>{children}</li>;
    case 'numbered-list':
      return <ol {...attributes}>{children}</ol>;
    default:
      return <p {...attributes}>{children}</p>;
  }
};

export const Leaf = ({ attributes, children, leaf }) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }

  if (leaf.code) {
    children = <code>{children}</code>;
  }

  if (leaf.italic) {
    children = <em>{children}</em>;
  }

  if (leaf.underline) {
    children = <u>{children}</u>;
  }

  return <span {...attributes}>{children}</span>;
};

const BlockButton = ({ format, children }) => {
  const editor = useSlate();
  return (
    <Box className='text-editor__formatting-bar--button-box'>
      <ToggleButton
        value={format}
        selected={isBlockActive(editor, format)}
        onMouseDown={(event) => {
          event.preventDefault();
          toggleBlock(editor, format);
        }}
        style={{
          lineHeight: 1,
          padding: 0,
          margin: 0,
          border: 0,
        }}
      >
        {children}
      </ToggleButton>
    </Box>
  );
};

const MarkButton = ({ format, children }) => {
  const editor = useSlate();
  return (
    <Box className='text-editor__formatting-bar--button-box'>
      <ToggleButton
        value={format}
        selected={isMarkActive(editor, format)}
        onMouseDown={(event) => {
          event.preventDefault();
          toggleMark(editor, format);
        }}
        style={{
          lineHeight: 1,
          padding: 0,
          margin: 0,
          border: 0,
        }}
      >
        {children}
      </ToggleButton>
    </Box>
  );
};

const FormattingMenu = React.forwardRef(({ children, ...props }, ref) => (
  <>
    <Box className='text-editor__toolbar-container text-editor__formatting-bar'>
      {children}
    </Box>
  </>
));

const FormattingToolbar = React.forwardRef(({ className, ...props }, ref) => (
  <FormattingMenu {...props} ref={ref} />
));

const FooterMenu = React.forwardRef(({ children, ...props }, ref) => (
  <>
    <Box className='text-editor__toolbar-container text-editor__footer-bar'>
      {children}
    </Box>
  </>
));

const FoooterToolbar = React.forwardRef(({ className, ...props }, ref) => (
  <FooterMenu {...props} ref={ref} />
));

const LIST_TYPES = ['numbered-list', 'bulleted-list'];

const isBlockActive = (editor, format) => {
  const [match] = Editor.nodes(editor, {
    match: (n) => n.type === format,
  });
  return !!match;
};

const isMarkActive = (editor, format) => {
  const marks = Editor.marks(editor);
  return marks ? marks[format] === true : false;
};

const toggleBlock = (editor, format) => {
  const isActive = isBlockActive(editor, format);
  const isList = LIST_TYPES.includes(format);

  Transforms.unwrapNodes(editor, {
    match: (n) => LIST_TYPES.includes(n.type),
    split: true,
  });

  Transforms.setNodes(editor, {
    type: isActive ? 'paragraph' : isList ? 'list-item' : format,
  });

  if (!isActive && isList) {
    const block = { type: format, children: [] };
    Transforms.wrapNodes(editor, block);
  }
};

const toggleMark = (editor, format) => {
  const isActive = isMarkActive(editor, format);

  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};

export default SlateTextEditor;
