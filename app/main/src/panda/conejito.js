import { Navigation } from './navigation.js';
import { agua } from './agua.js';

/**
 * Main entry point of panda application.
 */
class Main {
    constructor() {
        const navigation = new Navigation();
        this.navigateTo(navigation.viewName);
        this.wire();
    }

    wire(selector = '.dropdown-item') {
        const links = Array.from(document.querySelectorAll(selector)).filter(e => !e.getAttribute('data-bind'));
        links.forEach(element => {
            element.onclick = (e) => {
                const moduleNameWithHash = e.target.getAttribute('href');
                this.navigateTo(moduleNameWithHash);
            };
        });
    }

    navigateTo(moduleName) {
        if (moduleName.startsWith('#')) {
            moduleName = moduleName.substring(1);
        }
        agua.getTemplate(`${moduleName}.html`).then(template => {
            const viewContainer = document.getElementById('viewContainer');
            const view = document.getElementById('view');
            viewContainer.removeChild(view);
            const newView = document.createElement('div');
            newView.setAttribute('id', 'view');
            newView.innerHTML = template;
            viewContainer.appendChild(newView);
            const viewModelScriptId = 'view-model-script';
            let viewModelScript = document.getElementById(viewModelScriptId);
            if (viewModelScript) {
                viewModelScript.remove();
            }
            viewModelScript = document.createElement('script');
            viewModelScript.setAttribute('id', viewModelScriptId);
            viewModelScript.setAttribute('type', 'module');
            viewModelScript.setAttribute('src', `app/viewModel/${moduleName}.js?t=${Date.now()}`);
            document.body.appendChild(viewModelScript);
        });
    }
}

export const main = new Main();
