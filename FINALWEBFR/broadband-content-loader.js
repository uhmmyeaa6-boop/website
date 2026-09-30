// Content losder
const BroadbandContentLoader = {
    // Validate JSON 
    validateData(data) {
        if (!data || typeof data !== 'object') {
            throw new Error('Invalid data format');
        }

        if (!data.broadbandSections) {
            throw new Error('Missing broadbandSections');
        }

        return true;
    },

    // Load JSON data
    async loadBroadbandData() {
        try {
            const response = await fetch('broadband-data.json');

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            this.validateData(data);

            return data;
        } catch (error) {
            console.error('Error loading broadband data:', error);
            throw error;
        }
    },
    // Render public access content
    renderPublicAccess(containerId, content) {
        const container = document.getElementById(containerId);
        if (!container) {
            console.error(`Container ${containerId} not found`);
            return;
        }

        // Get the template
        const template = document.getElementById('public-access-template').innerHTML;

        // Prepare data for Mustache
        const templateData = {
            title: content.title,
            content: content.content,
            additionalContent: content.additionalContent,
            source: content.source
        };

        // Render Mustache
        const rendered = Mustache.render(template, templateData);

        container.innerHTML = rendered;
    },
    // Render broadband content
    renderFiberInfrastructure(containerId, content) {
        const container = document.getElementById(containerId);
        if (!container) {
            console.error(`Container ${containerId} not found`);
            return;
        }

        const template = document.getElementById('fiber-template').innerHTML;

        const templateData = {
            title: content.title,
            content: content.content,
            additionalContent1: content.additionalContent1,
            additionalContent2: content.additionalContent2,
            additionalContent3: content.additionalContent3,
            additionalContent4: content.additionalContent4,
            additionalContent5: content.additionalContent5,
            additionalContent6: content.additionalContent6,
            source: content.source
        };

        const rendered = Mustache.render(template, templateData);
        container.innerHTML = rendered;
        container.style.padding = '3rem';
        container.style.background = 'white';
        container.style.borderRadius = '25px';
    },

    // Initialize the content loader
    async init() {
        console.log('BroadbandContentLoader init started');

        try {
            const data = await this.loadBroadbandData();
            console.log('Broadband data loaded:', data);

            // Load public access content
            if (data.broadbandSections.publicAccess) {
                this.renderPublicAccess('public-access-content', data.broadbandSections.publicAccess);
            }

            // Load broadband content
            if (data.broadbandSections.fiberInfrastructure) {
                this.renderFiberInfrastructure('fiber-content', data.broadbandSections.fiberInfrastructure);
            }

        } catch (error) {
            console.error('Init error:', error);
        }
    }
};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    BroadbandContentLoader.init();
});