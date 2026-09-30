// Error handle
if (typeof Mustache === 'undefined') {
    console.error('Mustache.js is not loaded!');
}

const ContentLoader = {

    // Validate JSON (useful frfr)
    validateData(data) {
        if (!data || typeof data !== 'object') {
            throw new Error('Invalid data format');
        }

        if (!data.earlyISPs) {
            throw new Error('Missing earlyISPs section');
        }

        const requiredFields = ['title', 'content'];
        for (const [key, isp] of Object.entries(data.earlyISPs)) {
            for (const field of requiredFields) {
                if (!isp[field]) {
                    throw new Error(`Missing ${field} in ${key}`);
                }
            }
        }
        return true;
    },

    formatContent(content) {
        return content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    },

    // Load JSON data
    async loadHistoryData() {
        try {
            const response = await fetch('early-isps.json');

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            this.validateData(data);

            return data;
        } catch (error) {
            console.error('Error loading history data:', error);
            throw error;
        }
    },

    // Render using Mustache
    renderContent(containerId, content) {
        const container = document.getElementById(containerId);
        if (!container) {
            console.error(`Container ${containerId} not found`);
            return;
        }

        // Wait for Mustache 
        if (typeof Mustache === 'undefined') {
            console.error('Mustache is still not loaded!');
            setTimeout(() => this.renderContent(containerId, content), 100);
            return;
        }

        const template = document.getElementById('content-template').innerHTML;

        // Prepare data 
        const templateData = {
            ...content,
            formattedContent: this.formatContent(content.content)
        };

        const rendered = Mustache.render(template, templateData);

        // Update box
        container.innerHTML = rendered;
        container.classList.add('content-loaded');
    },

    // Shows error using Mustache
    showError(containerId, message) {
        const container = document.getElementById(containerId);
        if (container) {
            container.innerHTML = `<div class="error-message">Error: ${message}</div>`;
        }
    },

    // The content loader
    async init() {
        console.log('ContentLoader init started');
        console.log('Mustache available?', typeof Mustache !== 'undefined');

        try {
            const data = await this.loadHistoryData();
            console.log('Data loaded:', data);

            if (data.earlyISPs.technet) {
                this.renderContent('technet-container', data.earlyISPs.technet);
            }
            // Pacific Internet content
            if (data.earlyISPs.pacificInternet) {
                this.renderContent('pacific-container', data.earlyISPs.pacificInternet);
            }

            // Cyberway content
            if (data.earlyISPs.cyberway) {
                this.renderContent('cyberway-container', data.earlyISPs.cyberway);
            }

        } catch (error) {
            console.error('Init error:', error);
            this.showError('technet-container', 'Failed to load content');
        }
    }
};

document.addEventListener('DOMContentLoaded', () => {

    setTimeout(() => {
        ContentLoader.init();
    }, 500);
});