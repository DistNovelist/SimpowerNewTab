const StorageHandler = {
    exportToJSON() {
        const data = {};
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            data[key] = localStorage.getItem(key);
        }
        const json = JSON.stringify(data, null, 2);
        const blob = new Blob([json], { type: "application/json" });
        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = "simpowerNewTabData.json";
        a.click();

        URL.revokeObjectURL(url);
    },

    importFromJSON(file) {
        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const data = JSON.parse(event.target.result);
                for (const key in data) {
                    if (data.hasOwnProperty(key)) {
                        localStorage.setItem(key, data[key]);
                    }
                }
                alert("データが正常にインポートされました。");
                window.dispatchEvent(new Event("storage")); // 他のタブやアプリに変更を通知
            } catch (error) {
                console.error("JSONの解析に失敗しました:", error);
                alert("JSONファイルの形式が正しくありません。");
            }
        };
        reader.readAsText(file);
    }
};