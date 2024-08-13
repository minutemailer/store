import { createRoot } from 'react-dom/client';

import '@minutemailer/facade/styles/theme.scss';
import '@minutemailer/facade/styles/foundation.css';
import Button from '@minutemailer/facade/components/Button';
import Body from '@minutemailer/facade/components/Typography/Body';
import Stack from '@minutemailer/facade/components/Stack';
import generateQuote from "../src/generateQuote";
import {Text} from "@minutemailer/facade/components/Typography";

function App() {
    const quote = generateQuote();

    return (
        <Stack align="center" direction="vertical" valign="middle" height="screen" gap>
            <Body>{`"${quote[0]}"`}</Body>
            <Text><em>– {quote[1]}</em></Text>
            <Button component="a" href="https://minutemailer.com" target="_blank" rel="noopener noreferrer">Minutemailer</Button>
        </Stack>
    );
}

const root = createRoot(document.getElementById('app'));

root.render(<App />);
