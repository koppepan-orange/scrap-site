let Style = {
    back:{
        color: '#fff4ca',
        font: '#000000',
        under: '#50ad53',
    },
    play:{
        bor:"#0d2965",
        back0:"#515151",
        back:"#79b1ff"
    },
    tekiou: function() {
        for (let section in this) {
            if (section == 'apply') continue;
            for (let key in this[section]) {
                document.documentElement.style
                    .setProperty(`--${section}-${key}`, this[section][key]);
            }
        }
    }
}
