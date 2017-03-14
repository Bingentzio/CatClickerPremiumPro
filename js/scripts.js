
var model = {
    adminShow:false,
    currentCat:null,
    cats:[
        {
            clickCount : 0,
            name : 'Mike',
            img : 'images/cat1.jpg'
        },
        {
            clickCount : 0,
            name : 'John',
            img : 'images/cat2.jpg'
        },
        {
            clickCount : 0,
            name : 'Shane',
            img : 'images/cat3.jpg'
        },
        {
            clickCount : 0,
            name : 'Barac',
            img : 'images/cat4.jpg'
        },
        {
            clickCount : 0,
            name : 'Donald',
            img : 'images/cat5.jpg'
        }
    ]
};


var octopus = {
    catClickIncrement: function() {
        model.currentCat.clickCount ++;
        catView.render();
    },

    getCats: function() {
        return model.cats;
    },

    getCurrentCat: function(){
        return model.currentCat;
    },

    setCurrentCat:function(cat){
        model.currentCat = cat;
        var cats=model.cats;
        for (i=0; i < cats.length; i++){
            katua=cats[i];
            document.getElementById(katua.name).className = "none";
        }
        document.getElementById(cat.name).className = "active";
        adminView.hide();
        model.adminShow=false;
    },

    init: function() {
        model.currentCat = model.cats[0];
        catListView.init();
        catView.init();
        adminView.init();
        adminView.hide();
    },

    adminDisplay:function(){
        if(model.adminShow === false){
            model.adminShow = true;
            adminView.render();
            adminView.show();
        }else if(model.adminShow === true){
            model.adminShow = false;
            adminView.hide();
        }
    },

    adminCancel:function(){
        adminView.hide();
    },

    adminSave:function(){
        model.currentCat.name = adminCatName.value;
        model.currentCat.img = adminCatImgUrl.value;
        model.currentCat.clickCount = adminCatClicks.value;
        catView.render();
        catListView.render();
        adminView.hide();
    }
};


var catView = {
    init: function(){
    this.catImage = document.getElementById("catImage");
    this.name = document.getElementById("catName");
    this.clickCount = document.getElementById("clickKop");

    this.catImage.addEventListener('click', function(){
        octopus.catClickIncrement();
    });
    this.render();
    },

    render: function(){
        var currentCat = octopus.getCurrentCat();
        this.clickCount.textContent = "Number of times this cat was clicked: " + currentCat.clickCount;
        this.name.textContent = currentCat.name;
        this.catImage.src = currentCat.img;
    }
};

var catListView = {
    init: function() {
        this.catList = document.getElementById('catList');
        this.render();
    },

    render: function(){
        var i, cat, catElem, link;
        var cats=octopus.getCats();

        this.catList.innerHTML= '';

        for (i=0; i < cats.length; i++){
            cat=cats[i];
            catElem = document.createElement('li');
            link = document.createElement('a');
            link.textContent = cat.name;
            catElem.appendChild(link);
            catElem.id=cat.name;

            catElem.addEventListener('click', (function(catCopy) {
                return function(){
                octopus.setCurrentCat(catCopy);
                catView.render();
                };
            })(cat));

            this.catList.appendChild(catElem);
        }

    }
};

var adminView = {
    init:function(){
        this.adminCatName = document.getElementById('adminCatName');
        this.adminCatImgUrl = document.getElementById('adminCatImgUrl');
        this.adminCatClicks = document.getElementById('adminCatClicks');
        var adminContainer = document.getElementById('adminContainer');

        this.adminBtn = document.getElementById('adminBtn');
        this.adminCancelBtn = document.getElementById('adminCancelBtn');
        this.adminSaveBtn = document.getElementById('adminSaveBtn');

        this.adminBtn.addEventListener('click', function(){
            octopus.adminDisplay();
        });

        this.adminCancelBtn.addEventListener('click', function(){
            octopus.adminCancel();
        });

        this.adminSaveBtn.addEventListener('click', function(){
            octopus.adminSave();
        });

        this.render();
    },

    render:function(){
        var currentCat = octopus.getCurrentCat();
        this.adminCatName.value = currentCat.name;
        this.adminCatImgUrl.value = currentCat.img;
        this.adminCatClicks.value = currentCat.clickCount;
    },

    show:function(){
        adminContainer.style.display='block';
    },

    hide:function(){
        adminContainer.style.display='none';
    }
};

octopus.init();
