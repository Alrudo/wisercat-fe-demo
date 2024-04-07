# wisercat-fe-demo
This project is built as a demo application for Wisercat by Aleksandr Rudoi.

## Built with
- node v20.12.1
- npm 10.5.0

## Running guide
Start by running
```bash
npm install
```

Compile and Hot-Reload for development on port 4000:
```bash
npm run dev
```

Port can be changed in [package.json](package.json):
```yaml
 "dev": "vite --port {desired_port}"
```

Project requires running backend application on port 8080. Port can be changed
in [ApiService.js](src/js/ApiService.js):
```yaml
baseURL: "http://localhost:8080/api/v1/demo",
```
