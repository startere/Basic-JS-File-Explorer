function solve() {
    return function (fileContentsByName) {

        'use strict';

        var fileItemItems = document.getElementsByClassName('file-item item');

        var fileContentP = document.getElementsByClassName('file-content')[0];

        var $addBtn = $('.add-wrapper');

        var $items = $('.items');

        var $input = $('input');

        $items.on("click", function (event) {
            
            var $target = $(event.target);

            var $targetParent = $($target.parent());

            if ($targetParent.hasClass('file-item')) {
                var output = $target.text();
                fileContentP.textContent = fileContentsByName[output];
            }

            if($targetParent.hasClass('dir-item')){
                $targetParent.toggleClass('collapsed');
            }
            
            if ($target.hasClass('del-btn')) {
                $targetParent.remove();
            }

        });

        $addBtn.on("click", function (event) {
            var $target = $(event.target)
            
            if ($target.hasClass('add-btn')) {
                $target.toggleClass('visible');
                $input.toggleClass('visible');
            }
        });

        $input.on("keydown", function (event) {
            if (event.keyCode === 13) {
                var $addBtn = $('.add-btn');
                $input.toggleClass('visible');
                $addBtn.toggleClass('visible');

                var input = $input[0].value;

                //$items[0].children[0].cloneNode(true);

                var liTemplate = document.createElement('li');
                liTemplate.className = "file-item item";

                var itemTemplate = document.createElement('a');
                itemTemplate.className = "item-name";

                var deleteBtnTemplate = document.createElement('a');
                deleteBtnTemplate.className = "del-btn";

                liTemplate.appendChild(itemTemplate);

                liTemplate.appendChild(deleteBtnTemplate);

                console.log(liTemplate);

                if (input.indexOf('/') === -1) {
                    liTemplate.children[0].innerHTML = input;
                    $items[0].appendChild(liTemplate);
                }
                else {
                    var inputArr = input.split('/');
                    
                    var existingDirs = document.getElementsByClassName('dir-item');

                    var matchingDir;

                    for (var i = 0; i < existingDirs.length; i++) {
                        if(existingDirs[i].children[0].innerHTML === inputArr[0]){
                            matchingDir = existingDirs[i];
                        }
                    }

                    if (matchingDir !== undefined) {
                        liTemplate.children[0].innerHTML = inputArr[1];
                        matchingDir.children[1].appendChild(liTemplate);
                    }              
                }
            }
        });
    }
}

if (typeof module !== 'undefined') {
    module.exports = solve;
}