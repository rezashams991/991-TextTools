export default function run(container) {
  container.innerHTML = `
    <h3>🔄 JSON ↔ CSV</h3>
    <div style="margin:0.5rem 0;display:flex;gap:0.5rem;flex-wrap:wrap;">
      <button id="jsonToCsvBtn">JSON → CSV</button>
      <button id="csvToJsonBtn">CSV → JSON</button>
    </div>
    <textarea id="input" rows="6" placeholder='[{"name":"Ali","age":30},{"name":"Sara","age":25}]' style="width:100%;"></textarea>
    <div id="output" style="background:#f5f5f5;padding:0.5rem;border-radius:4px;white-space:pre-wrap;margin-top:0.5rem;"></div>
  `;

  // Load PapaParse from CDN
  const loadPapa = () => {
    if (window.Papa) return Promise.resolve(window.Papa);
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/PapaParse/5.4.1/papaparse.min.js';
      script.onload = () => resolve(window.Papa);
      script.onerror = reject;
      document.head.appendChild(script);
    });
  };

  const input = container.querySelector('#input');
  const output = container.querySelector('#output');
  const jsonToCsvBtn = container.querySelector('#jsonToCsvBtn');
  const csvToJsonBtn = container.querySelector('#csvToJsonBtn');

  jsonToCsvBtn.onclick = async () => {
    try {
      const Papa = await loadPapa();
      const data = JSON.parse(input.value);
      const csv = Papa.unparse(data);
      output.textContent = csv;
    } catch (err) {
      output.textContent = `❌ Error: ${err.message}`;
    }
  };

  csvToJsonBtn.onclick = async () => {
    try {
      const Papa = await loadPapa();
      const result = Papa.parse(input.value, { header: true, skipEmptyLines: true });
      output.textContent = JSON.stringify(result.data, null, 2);
    } catch (err) {
      output.textContent = `❌ Error: ${err.message}`;
    }
  };
}