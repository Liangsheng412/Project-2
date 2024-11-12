window.addEventListener('load', () => {
    document.getElementById('button-comic').addEventListener('click', () => {
        let nacomic = document.getElementById('answer-comic').value;
        console.log(nacomic);

        // creating the object 
        let obj = {"name": nacomic,"likes":0};

        // stringify the object
        let jsonData = JSON.stringify(obj);

        fetch('/nacomic', {
            method: 'POST',
            headers: {
                "Content-type": "application/json"
            },
            body: jsonData
        })
        .then(response => response.json())
        .then(data => {console.log(data)});
    });

    // sort by like button
            document.getElementById('sort-by-likes').addEventListener('click', () => {
              fetch('/getcomic')
             .then(resp => resp.json())
             .then(data => {
                 document.getElementById('list-comic-01').innerHTML = ''; 
                 document.getElementById('list-comic-02').innerHTML = ''; 
                 document.getElementById('list-comic-03').innerHTML = ''; 
                 document.getElementById('list-comic-04').innerHTML = ''; 
                 document.getElementById('list-comic-05').innerHTML = ''; 
                 document.getElementById('list-comic-06').innerHTML = ''; 
                 console.log(data.data); 

        // sort from high to low
        const sortedData = data.data.sort((a, b) => b.likes - a.likes);

        sortedData.slice(0, 6).forEach((comic, i) => {
            let elt = document.createElement('p');
            elt.innerHTML = `${comic.comic} (Likes: ${comic.likes})`;

            let likeButton = document.createElement('button');
            likeButton.className = 'like-button'; 
            likeButton.innerText = 'Like';
            likeButton.onclick = () => {
                fetch('/likecomic', {
                    method: 'POST',
                    headers: { "Content-type": "application/json" },
                    body: JSON.stringify({ comicName: comic.comic })
                })
                .then(resp => resp.json())
                .then(response => {
                    elt.innerHTML = `${comic.comic} (Likes: ${response.newLikes})`; 
                });
            };

            document.getElementById(`list-comic-0${i + 1}`).appendChild(elt);
            document.getElementById(`list-comic-0${i + 1}`).appendChild(likeButton);
        });
    });
});


document.getElementById('record-comic').addEventListener('click', () => {
    fetch('/getcomic')
    .then(resp => resp.json())
    .then(data => {
        document.getElementById('list-comic-01').innerHTML = '';
        document.getElementById('list-comic-02').innerHTML = '';
        document.getElementById('list-comic-03').innerHTML = '';
        document.getElementById('list-comic-04').innerHTML = '';
        document.getElementById('list-comic-05').innerHTML = '';
        document.getElementById('list-comic-06').innerHTML = '';
        console.log(data.data);

        const containerIds = ['list-comic-01','list-comic-02','list-comic-03','list-comic-04','list-comic-05','list-comic-06']
      
        if (data.data.length > 0) {
            const selectedIndexes = new Set();
            
            while (selectedIndexes.size < 6) {
                const randomIndex = Math.floor(Math.random() * data.data.length);
                selectedIndexes.add(randomIndex);
                console.log(selectedIndexes.size);
            }
                 console.log(selectedIndexes.size);
            [...selectedIndexes].forEach((index, i) => {
                let elt = document.createElement('p');
                elt.innerHTML = `${data.data[index].comic} (Likes: ${data.data[index].likes})`;

                // create like button
                console.log("creatingLike-buttons");
                let likeButton = document.createElement('button');
                likeButton.className = 'like-button';
                likeButton.innerText = 'Like';
                likeButton.onclick = () => {
                    fetch('/likecomic', {
                        method: 'POST',
                        headers: { "Content-type": "application/json" },
                        body: JSON.stringify({ comicName: data.data[index].comic,likes: 0 })
                    })
                    .then(resp => resp.json())
                    .then(response => {
                        elt.innerHTML = `${data.data[index].comic} (Likes: ${response.newLikes})`; // 更新点赞数
                    });
                };
                //创建点赞
                document.getElementById(containerIds[i]).appendChild(elt);
                document.getElementById(containerIds[i]).appendChild(likeButton); 
            });
        } else {
            document.getElementById('list-comic-01').innerHTML = '<p>No comic records found.</p>';
            document.getElementById('list-comic-02').innerHTML = '<p>No comic records found.</p>';
            document.getElementById('list-comic-03').innerHTML = '<p>No comic records found.</p>';
            document.getElementById('list-comic-04').innerHTML = '<p>No comic records found.</p>';
            document.getElementById('list-comic-05').innerHTML = '<p>No comic records found.</p>';
            document.getElementById('list-comic-06').innerHTML = '<p>No comic records found.</p>';

        }
    });
});
});

const recordcomicButton = document.getElementById("record-comic");
const comicImages = document.querySelectorAll(".image-item img"); 
const comicLists = document.querySelectorAll(".list-comic");
const comicFont = document.querySelectorAll(".input-container");



recordcomicButton.addEventListener("click", () => {
    comicLists.forEach(img => {
        img.style.display = "block"; 
    });
});
recordcomicButton.addEventListener("click", () => {
    comicImages.forEach(img => {
        img.style.display = "block"; 
    });
});
recordcomicButton.addEventListener("click", () => {
    comicFont.forEach(img => {
        img.style.display = "none"; 
    });
});