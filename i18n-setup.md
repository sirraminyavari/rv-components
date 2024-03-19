# I18n setup
The @cliqmind/rv-component uses [i18next](https://www.i18next.com) and it's NSs(namespaces) structure under the hood for versatilely and ease of use. 

## Prerequisites

- Select and install the appropriate `i18next` integration for the desired deployment framework in the [supported frameworks](https://www.i18next.com/overview/supported-frameworks). (The  [react-i18next](https://www.npmjs.com/package/react-i18next) package is recommended for setup since it is the minimal wrapper library around the core `i18next` with the minimal that can be used with any react based UI framework).

- Bootstrap the initialization of [`i18n` core](https://www.i18next.com/overview/api#init) (additional information regarding the first setup can be found [here](https://www.i18next.com/overview/first-setup-help)).
- install and setup the required `i18next` middlewares (ex. [i18next-http-backend](https://www.npmjs.com/package/i18next-http-backend)).
- create the needed the translation NSs(namespaces) structure and import them in in the previously create i18n configuration according to [declaration file guide](https://www.i18next.com/overview/typescript#create-a-declaration-file).


### NS setup convention

- `common`: Any global texts are stored as **common** ns and recommended to be loaded in the initial page load.
- `[view-block]`: A separate NS is used for each developed UI (ex. `server-management`), so that can be lazy-loaded or bundled as a whole.

>The required NSs/translation-keys boilerplate with acceptable convention structure used in `rv-components` package, can be created via `yarn i18n:boilerplate`. The command will create a **locale** folder in the src directory.(coming soon :sweat_smile:)
