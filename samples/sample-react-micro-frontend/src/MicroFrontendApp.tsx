import * as React from 'react';
import { Context, withContext } from '@micro-frontend-react/core/lib/Context';
import * as AdaptiveCards from 'adaptivecards';
import { AdaptiveCard } from "adaptivecards-react";
import * as ACFluentUI from "adaptivecards-fluentui";
import card01 from "./cards/card01.json"

function MyCard(): React.ReactElement{
  const { userProvider, customData } = React.useContext(
    Context as React.Context<{
      userProvider: { getUserName(): string,
        InitVisibility: boolean } ;
      customData?: string;
    }>
  );
  const [userName, setUserName] = React.useState<string>('Guest');

  React.useEffect(() => {
    const userName = userProvider.getUserName();
    setUserName(userName);
  }, [userProvider]);

   

// Create an AdaptiveCard instance

var adaptiveCard = new AdaptiveCards.AdaptiveCard();

//ACFluentUI.useFluentUI();

// Set its hostConfig property unless you want to use the default Host Config
// Host Config defines the style and behavior of a card
adaptiveCard.hostConfig = new AdaptiveCards.HostConfig({
    fontFamily: "Segoe UI, Helvetica Neue, sans-serif"
    // More host config options
});

// Set the adaptive card's event handlers. onExecuteAction is invoked
// whenever an action is clicked in the card

//adaptiveCard.onExecuteAction

var cardAction = function (action:any) {
	var message = "Action executed\n";
	message += "    Title: " + action.title + "\n";

	if (action instanceof AdaptiveCards.OpenUrlAction) {
		message += "    Type: OpenUrl\n";
		message += "    Url: " + action.url + "\n";
	}
	else if (action instanceof AdaptiveCards.SubmitAction) {
		message += "    Type: Submit\n";
		message += "    Data: " + JSON.stringify(action.data);
	}
	else {
		message += "    Type: <unknown>";
	}

	alert(message);
}


// For markdown support you need a third-party library
// E.g., to use markdown-it, include in your HTML page:
//     <script type="text/javascript" src="https://unpkg.com/markdown-it/dist/markdown-it.js"></script>
// And add this code to replace the default markdown handler:
//     AdaptiveCards.AdaptiveCard.onProcessMarkdown = function (text, result) {
//         result.outputHtml = markdownit().render(text);
//         result.didProcess = true;
//     };

// Parse the card payload
adaptiveCard.parse(card01);

// Render the card to an HTML element:
//var renderedCard = adaptiveCard.render();
// And finally insert it somewhere in your page:
//document.body.appendChild(renderedCard);

  return (
    <div>
      <h1>My Card</h1>
      { userProvider.InitVisibility ? <AdaptiveCard
          payload={card01}
          style={{ width: '300px' }}
          onExecuteAction={cardAction}        
       /> : <h2>Hidden</h2> }
      
    </div>
  );
}

function MicroFrontendApp(): React.ReactElement {
  const { userProvider, customData } = React.useContext(
    Context as React.Context<{
      userProvider: { getUserName(): string };
      customData?: string;
    }>
  );
  const [userName, setUserName] = React.useState<string>('Guest');

  React.useEffect(() => {
    const userName = userProvider.getUserName();
    setUserName(userName);
  }, [userProvider]);
 
  return (
    <div 
      style={{
        backgroundColor: '#ff6384',
      }}
    >
      Hello, {userName} from {__APP_NAME__}
      {customData ? ` with ${customData}` : ''}!      
    </div>
  );
}

const connected = withContext(MyCard);
export { connected as MyCard };

const connected01 = withContext(MicroFrontendApp);
export { connected01 as MicroFrontendApp };
