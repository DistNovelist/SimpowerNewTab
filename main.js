document.addEventListener("alpine:init", () => {
    Alpine.data("newTabApp", () => ({
        searchQuery: "",
        note: localStorage.getItem("note") || "",
        todoList: JSON.parse(localStorage.getItem("todoList")) || [],
        links: JSON.parse(localStorage.getItem("links")) || [],
        newLinkText: "",
        newLinkUrl: "",
        settings: JSON.parse(localStorage.getItem("settings")) || { 
            showNote: true, 
            showToDo: true, 
            showLinks: true, 
            searchEngine: "https://www.google.com/search?q=",
            theme: "light"
        },
        init() { 
            window.addEventListener("storage", () => { this.loadData(); });
            this.applyTheme();
            this.initSortable();
            this.$nextTick(() => {
                this.$refs.searchInput.focus(); // 検索窓にフォーカスを設定
            });
        },
        search() { window.location.href = this.settings.searchEngine + encodeURIComponent(this.searchQuery); },
        saveNote() { localStorage.setItem("note", this.note); },
        saveToDo() {
            localStorage.setItem("todoList", JSON.stringify(this.todoList));
        },
        addToDo() { this.todoList.push({ text: "", done: false }); this.saveToDo(); },
        removeToDo(index) { this.todoList.splice(index, 1); this.saveToDo(); },
        addLink() { 
            if (this.newLinkText && this.newLinkUrl) {
                this.links.push({ text: this.newLinkText, url: this.newLinkUrl }); 
                this.saveLinks(); 
                this.newLinkText = "";
                this.newLinkUrl = "";
            }
        },
        removeLink(index) { this.links.splice(index, 1); this.saveLinks(); },
        editLink(index) {
            const link = this.links[index];
            this.newLinkText = link.text;
            this.newLinkUrl = link.url;
            this.links.splice(index, 1); // 編集対象を一旦削除
            this.saveLinks();
        },
        saveLinks() {
            localStorage.setItem("links", JSON.stringify(this.links));
        },
        saveSettings() { 
            localStorage.setItem("settings", JSON.stringify(this.settings)); 
            this.applyTheme();
        },
        loadData() { 
            // 他のタブで変更されたデータを再読み込み
            this.note = localStorage.getItem("note") || "";
            this.todoList = JSON.parse(localStorage.getItem("todoList")) || [];
            this.links = JSON.parse(localStorage.getItem("links")) || [];
            this.settings = JSON.parse(localStorage.getItem("settings")) || this.settings;
            this.applyTheme(); // テーマを再適用
            this.initSortable(); // Sortableを再初期化
        },
        applyTheme() {
            document.documentElement.setAttribute("data-theme", this.settings.theme);
        },
        initSortable() {
            // LinksのSortable初期化
            new Sortable(document.getElementById("sortableLinks"), {
                animation: 150,
                onEnd: (evt) => {
                    const movedItem = this.links.splice(evt.oldIndex, 1)[0];
                    this.links.splice(evt.newIndex, 0, movedItem);
                    this.links = [...this.links]; // 配列を再代入してAlpine.jsに変更を通知
                    this.saveLinks();
                    // 強制的にUIを更新
                    this.$nextTick(() => {
                        const sortableElement = document.getElementById("sortableLinks");
                        sortableElement.innerHTML = ""; // 一旦空にする
                        this.links.forEach((link, index) => {
                            // 再描画のためにテンプレートを再適用
                            const li = document.createElement("li");
                            li.className = "flex items-center gap-2 bg-base-100 p-2 rounded shadow";
                            li.innerHTML = `
                                <span class="cursor-move text-gray-500">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 10h16M4 14h16" />
                                    </svg>
                                </span>
                                <img src="https://www.google.com/s2/favicons?sz=32&domain_url=${link.url}" alt="favicon" class="w-6 h-6">
                                <a href="${link.url}" class="link no-underline flex-1">${link.text}</a>
                                <button @click="editLink(index)" class="btn btn-sm btn-warning">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 64 64">
                                        <path d="M43,10 L52,19 L44,26 L36,18 z" style="fill:#333;stroke:none;" />
                                        <path d="M33,20 L42,29 L25,46 L14,48 L16,37 z" style="fill:#333;stroke:none;" />
                                    </svg>
                                </button>
                                <!-- 削除ボタン -->
                                <button @click="removeLink(index)" class="btn btn-sm btn-error">X</button>
                            `;
                            sortableElement.appendChild(li);
                        });
                    });
                }
            });
        
            // ToDoリストのSortable初期化
            new Sortable(document.getElementById("sortableToDo"), {
                animation: 150,
                onEnd: (evt) => {
                    const movedItem = this.todoList.splice(evt.oldIndex, 1)[0];
                    this.todoList.splice(evt.newIndex, 0, movedItem);
                    this.todoList = [...this.todoList]; // 配列を再代入してAlpine.jsに変更を通知
                    this.saveToDo();
                    // 強制的にUIを更新
                    this.$nextTick(() => {
                        const sortableElement = document.getElementById("sortableToDo");
                        sortableElement.innerHTML = ""; // 一旦空にする
                        this.todoList.forEach((item, index) => {
                            // 再描画のためにテンプレートを再適用
                            const li = document.createElement("li");
                            li.className = "flex items-center gap-2 bg-base-100 p-2 rounded shadow";
                            li.innerHTML = `
                                <span class="cursor-move text-gray-500">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 10h16M4 14h16" />
                                    </svg>
                                </span>
                                <input type="checkbox" class="checkbox" ${item.done ? "checked" : ""} @change="saveToDo" />
                                <input type="text" value="${item.text}" class="input input-sm w-full" @input="saveToDo" />
                                <button @click="removeToDo(${index})" class="btn btn-sm btn-error">×</button>
                            `;
                            sortableElement.appendChild(li);
                        });
                    });
                }
            });
        },
        exportData() {
            StorageHandler.exportToJSON();
        },
        importData(event) {
            const file = event.target.files[0];
            if (file) {
                StorageHandler.importFromJSON(file);
            }
        }
    }));
});
