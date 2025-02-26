# Case Study

Case study during my job application for code intelligence. Turned out positive, got an offer but have chosen some other offering.

## Getting started

- Clone repository
- Call `yarn` in CLI
- Call `yarn start` for starting local development server and running it locally

OR

- Click here: https://codeintelligence-casestudy-cw06ukczi-acunguersoy.vercel.app/ :)

### Concept

I am using the following helper libraries for making things work:

- `octokit`
- `redux`
- `react-router-dom`
- `@mui` (Material-UI)

#### octokit
`octokit` is an official wrapper for the github API. For getting first insights about the package I decided to use it here for the API calls instead of using other Promise-based packages like `axios` for example. The great thing about `octokit`, from a developer experience, is the fact that all given API routes are fully typed available, when using the request function of the library, see for example the following screenshot:

![image](https://user-images.githubusercontent.com/4239691/146686894-d76549b9-2fe1-4a1a-b22b-23275f492a33.png)


#### redux

`redux` is used for storing the meta infos of the fetched github repositories per page (here: 100 `per_page`). This can be reused when visiting `Details` page of a repository as the meta info for the repository has all infos needed for querying Github API for repo details.

#### react-router-dom

`react-router-dom` is used for client side routing, namely for showing different github list pages and showing the details for the selected repository.
The connection to browser history (when using back and forth of browser) helps for querying the requested information. Also it enables to share a specific page link in the list view as the route parameter ensure showing the requested informations (here: the 100 github repos for the requested page) - example: https://codeintelligence-casestudy-5owqrbeyz-acunguersoy.vercel.app/repositories/200 (where `200` is the id of the first repository to show)

#### @mui

`Material UI` is used for having a styled components library for rendering the content of the application, namely using buttons, text, layout components for rendering content of the list and the details page

### Things to improve

First, adding more type safety by adding type definition for every written component, namely removing all `any` usages and of course, tests can be added. The nested approach for `react-router-dom` can be used for more usage of the powerful `<Outlet />` component, provided by the library.
Finally, all magic color values can be moved to a custom @mui `Theme` definition.
