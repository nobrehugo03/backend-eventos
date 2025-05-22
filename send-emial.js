const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');

// Configurações do transporter (dados sensíveis ainda hardcoded, mas idealmente use .env)
let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: '587',
    secure: false,
    auth: {
        user: 'wanderson@ifsp.edu.br',
        pass: 'tzus gupj vkij pkkg'
    }
});

// Lê o template HTML de um arquivo externo
const loadTemplate = (templateName, replacements) => {
    const templatePath = path.join(__dirname, `${templateName}.html`);
    let html = fs.readFileSync(templatePath, 'utf8');

    // Substitui placeholders dinâmicos (ex: {{nome}})
    Object.keys(replacements).forEach(key => {
        html = html.replace(new RegExp(`{{${key}}}`, 'g'), replacements[key]);
    });

    return html;
};

// Função principal
const sendEmail = async () => {
    try {
        const html = loadTemplate('welcomeTemplate', { nome: 'Wanderson' });

        let info = await transporter.sendMail({
            from: '"IFSP" <wanderson@ifsp.edu.br>',
            to: 'wasare@gmail.com',
            subject: 'Bem-vindo!',
            text: 'Seja bem-vindo!', // Fallback para clientes sem suporte a HTML
            html: html
        });

        console.log(`E-mail enviado: ${info.messageId}`);
    } catch (error) {
        console.error('Erro:', error);
    }
};

sendEmail();