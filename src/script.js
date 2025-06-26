// Mock data generation
class PersonDataGenerator {
    constructor() {
        this.firstNames = [
            'Ana', 'Carlos', 'Maria', 'João', 'Beatriz', 'Pedro', 'Juliana', 'Rafael',
            'Camila', 'Diego', 'Fernanda', 'Lucas', 'Mariana', 'Thiago', 'Larissa',
            'Gabriel', 'Patrícia', 'Rodrigo', 'Vanessa', 'Bruno', 'Amanda', 'Felipe',
            'Carla', 'Marcos', 'Renata', 'André', 'Priscila', 'Leandro', 'Sabrina', 'Vitor'
        ];
        
        this.lastNames = [
            'Silva', 'Santos', 'Oliveira', 'Souza', 'Rodrigues', 'Ferreira', 'Alves',
            'Pereira', 'Lima', 'Gomes', 'Costa', 'Ribeiro', 'Martins', 'Carvalho',
            'Almeida', 'Lopes', 'Soares', 'Fernandes', 'Vieira', 'Barbosa', 'Rocha',
            'Dias', 'Monteiro', 'Mendes', 'Ramos', 'Moreira', 'Araújo', 'Cardoso'
        ];
        
        this.domains = [
            'gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'empresa.com.br',
            'email.com', 'bol.com.br', 'ig.com.br', 'uol.com.br', 'terra.com.br'
        ];
        
        this.people = [];
        this.generateInitialData();
    }
    
    generateInitialData() {
        // Generate 8-12 initial people
        const count = Math.floor(Math.random() * 5) + 8;
        this.people = [];
        
        for (let i = 0; i < count; i++) {
            this.people.push(this.generatePerson());
        }
    }
    
    generatePerson() {
        const firstName = this.firstNames[Math.floor(Math.random() * this.firstNames.length)];
        const lastName = this.lastNames[Math.floor(Math.random() * this.lastNames.length)];
        const domain = this.domains[Math.floor(Math.random() * this.domains.length)];
        
        const name = `${firstName} ${lastName}`;
        const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${domain}`;
        const phone = this.generatePhone();
        
        return { name, email, phone };
    }
    
    generatePhone() {
        // Generate Brazilian phone number format
        const areaCode = Math.floor(Math.random() * 89) + 11; // 11-99
        const firstPart = Math.floor(Math.random() * 90000) + 10000; // 10000-99999
        const secondPart = Math.floor(Math.random() * 9000) + 1000; // 1000-9999
        
        return `(${areaCode}) ${firstPart}-${secondPart}`;
    }
    
    updateData() {
        // Randomly update 1-3 people's data
        const updateCount = Math.floor(Math.random() * 3) + 1;
        const indices = [];
        
        // Select random indices to update
        while (indices.length < updateCount && indices.length < this.people.length) {
            const index = Math.floor(Math.random() * this.people.length);
            if (!indices.includes(index)) {
                indices.push(index);
            }
        }
        
        // Update selected people
        indices.forEach(index => {
            this.people[index] = this.generatePerson();
        });
        
        // Occasionally add or remove a person
        const action = Math.random();
        if (action < 0.1 && this.people.length > 5) {
            // Remove a person (10% chance, min 5 people)
            const removeIndex = Math.floor(Math.random() * this.people.length);
            this.people.splice(removeIndex, 1);
        } else if (action < 0.2 && this.people.length < 15) {
            // Add a person (10% chance, max 15 people)
            this.people.push(this.generatePerson());
        }
    }
    
    getData() {
        return [...this.people]; // Return a copy
    }
}

// UI Management
class UIManager {
    constructor() {
        this.tableBody = document.getElementById('people-tbody');
        this.lastUpdateElement = document.getElementById('last-update-time');
        this.loadingElement = document.getElementById('loading');
    }
    
    showLoading() {
        this.loadingElement.classList.add('show');
    }
    
    hideLoading() {
        this.loadingElement.classList.remove('show');
    }
    
    updateTable(people) {
        // Clear existing data
        this.tableBody.innerHTML = '';
        
        // Add new data
        people.forEach((person, index) => {
            const row = document.createElement('tr');
            row.className = 'fade-in';
            
            row.innerHTML = `
                <td>${this.escapeHtml(person.name)}</td>
                <td>${this.escapeHtml(person.email)}</td>
                <td>${this.escapeHtml(person.phone)}</td>
            `;
            
            this.tableBody.appendChild(row);
        });
    }
    
    updateTimestamp() {
        const now = new Date();
        const timeString = now.toLocaleString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
        
        this.lastUpdateElement.textContent = timeString;
    }
    
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Main Application
class PeopleSearchApp {
    constructor() {
        this.dataGenerator = new PersonDataGenerator();
        this.uiManager = new UIManager();
        this.updateInterval = null;
        
        this.init();
    }
    
    init() {
        // Initial load
        this.updateData();
        
        // Set up auto-refresh every 10 seconds
        this.updateInterval = setInterval(() => {
            this.updateData();
        }, 10000);
        
        console.log('People Search App initialized - Auto-refresh every 10 seconds');
    }
    
    updateData() {
        this.uiManager.showLoading();
        
        // Simulate API delay
        setTimeout(() => {
            this.dataGenerator.updateData();
            const people = this.dataGenerator.getData();
            
            this.uiManager.updateTable(people);
            this.uiManager.updateTimestamp();
            this.uiManager.hideLoading();
            
            console.log(`Data updated - ${people.length} people displayed`);
        }, 500);
    }
    
    destroy() {
        if (this.updateInterval) {
            clearInterval(this.updateInterval);
            this.updateInterval = null;
        }
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.peopleApp = new PeopleSearchApp();
});

// Clean up on page unload
window.addEventListener('beforeunload', () => {
    if (window.peopleApp) {
        window.peopleApp.destroy();
    }
});