const apiKey = '02bdb611407e4829909911118e42855a';
const main = document.querySelector('main');
const sourceSelector = document.querySelector('#sourceSelector');
const defaultSource = 'the-times-of-india';
window.addEventListener('load', async e => {
    updateNews();
    await updateResources();
    sourceSelector.value = defaultSource;
    sourceSelector.addEventListener('change', e => {
        updateNews(e.target.value);
    });
    if('serviceWorker' in navigator){
        try {
            navigator.serviceWorker.register('sw.js');
            console.log("Reg Success");
        } catch (error) {
            console.log("Reg Failes");
        }
    }
});
async function updateNews(source = defaultSource) {
    res = await fetch(`https://newsapi.org/v1/articles?source=${source}&category=business&apiKey=` + apiKey);
    const json = await res.json();
    main.innerHTML = json.articles.map(createArticle).join('\n');
}
async function updateResources() {
    res = await fetch('https://newsapi.org/v1/sources?apiKey=' + apiKey);
    const json = await res.json();
    sourceSelector.innerHTML = json.sources.map(src => `<option value="${src.id}">${src.name}</option>`).join('\n');
}

function createArticle(article) {
    return `
    <div class="article"><a href="${article.url}"><h2>${article.title}</h2><img src="${article.urlToImage}"><p>${article.description}</p></a></div>`;
}