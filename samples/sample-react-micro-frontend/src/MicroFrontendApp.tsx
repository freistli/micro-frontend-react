import * as React from 'react';
import { Context, withContext } from '@micro-frontend-react/core/lib/Context';
import * as AdaptiveCards from 'adaptivecards';
import { AdaptiveCard } from "adaptivecards-react";
import * as ACFluentUI from "adaptivecards-fluentui";

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

  var card = {
    "type": "AdaptiveCard",
    "body": [
        {
            "type": "TextBlock",
            "size": "Medium",
            "weight": "Bolder",
            "text": "Publish Adaptive Card Schema"
        },
        {
            "type": "ColumnSet",
            "columns": [
                {
                    "type": "Column",
                    "items": [
                        {
                            "type": "Image",
                            "style": "Person",
                            "url": "https://pbs.twimg.com/profile_images/3647943215/d7f12830b3c17a5a9e4afcc370e3a37e_400x400.jpeg",
                            "size": "Small"
                        }
                    ],
                    "width": "auto"
                },
                {
                    "type": "Column",
                    "items": [
                        {
                            "type": "TextBlock",
                            "weight": "Bolder",
                            "text": "Matt Hidinger",
                            "wrap": true
                        },
                        {
                            "type": "TextBlock",
                            "spacing": "None",
                            "text": "Created {{DATE(2017-02-14T06:08:39Z,SHORT)}}",
                            "isSubtle": true,
                            "wrap": true
                        }
                    ],
                    "width": "stretch"
                }
            ]
        },
        {
            "type": "TextBlock",
            "text": "Now that we have defined the main rules and features of the format, we need to produce a schema and publish it to GitHub. The schema will be the starting point of our reference documentation.",
            "wrap": true
        },
        {
            "type": "FactSet",
            "facts": [
                {
                    "title": "Board:",
                    "value": "Adaptive Cards"
                },
                {
                    "title": "List:",
                    "value": "Backlog"
                },
                {
                    "title": "Assigned to:",
                    "value": "Matt Hidinger"
                },
                {
                    "title": "Due date:",
                    "value": "Not set"
                }
            ]
        }
    ],
    "actions": [
        {
            "type": "Action.ShowCard",
            "title": "Set due date",
            "card": {
                "type": "AdaptiveCard",
                "body": [
                    {
                        "type": "Input.Date",
                        "id": "dueDate"
                    },
                    {
                        "type": "Input.Text",
                        "id": "comment",
                        "placeholder": "Add a comment",
                        "isMultiline": true
                    }
                ],
                "actions": [
                    {
                        "type": "Action.Submit",
                        "title": "OK"
                    }
                ],
                "$schema": "http://adaptivecards.io/schemas/adaptive-card.json"
            }
        },
        {
            "type": "Action.OpenUrl",
            "title": "View",
            "url": "https://adaptivecards.io"
        }
    ],
    "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
    "version": "1.5"
};

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
adaptiveCard.parse(card);

// Render the card to an HTML element:
//var renderedCard = adaptiveCard.render();
// And finally insert it somewhere in your page:
//document.body.appendChild(renderedCard);

  return (
    <div>
      <h1>My Card</h1>
      { userProvider.InitVisibility ? <AdaptiveCard
          payload={card}
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
export { connected as MicroFrontendApp };
