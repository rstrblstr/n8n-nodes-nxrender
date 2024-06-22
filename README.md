# n8n-nodes-nxrender

This repository contains an n8n node plugin that integrates with the [Nexrender](https://github.com/inlife/nexrender) Node.js API (@nexrender/api) to automate After Effects production. This project is based on the [n8n-nodes-starter](https://github.com/n8n-io/n8n-nodes-starter) template.

## Description

The `n8n-nodes-nxrender` plugin provides nodes for interacting with nexrender's API, allowing you to automate After Effects rendering tasks within your n8n workflows.

### Important Note

This plugin is currently a work in progress and **does not work yet**. Contributions and debugging assistance are welcome.

## Getting Started

1. **Clone the repository:**
    ```sh
    git clone https://github.com/your-username/n8n-nodes-nxrender.git
    ```
2. **Install dependencies:**
    ```sh
    cd n8n-nodes-nxrender
    npm install
    ```
3. **Refer to the [n8n documentation on creating nodes](https://docs.n8n.io/integrations/creating-nodes/) for guidance on how to build and modify nodes.**

4. **Explore and modify the example nodes in the `/nodes` directory or create your own custom nodes.**

5. **Update the `package.json` file to match your project's details.**

6. **Lint your code for errors:**
    ```sh
    npm run lint
    ```
   To automatically fix linting errors when possible, run:
    ```sh
    npm run lintfix
    ```

7. **Publish your package to npm once it's ready:**
    ```sh
    npm publish
    ```

## Example Usage

To use the nexrender node in your n8n workflows, follow these steps:

1. Add the `Nxrender` node to your n8n workflow.
2. Configure the node with the required parameters such as API endpoint, job UID, template source, composition name, and other settings.
3. Run the workflow to automate After Effects rendering tasks using [Nexrender](https://github.com/inlife/nexrender).

## Contribution

Contributions to enhance the functionality of this plugin are welcome. Please fork the repository, make your changes, and submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](https://github.com/n8n-io/n8n-nodes-starter/blob/master/LICENSE.md) file for details.

---

**Note:** This plugin is currently under development and is not functional yet. We appreciate your patience and contributions to make it work.

