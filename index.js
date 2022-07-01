let count = 1;

magazines.forEach((ele) => {
  fetchMagazines(ele);
});

async function fetchMagazines(magazine) {
  try {
    const magazineTopic = await fetch(
      `https://api.rss2json.com/v1/api.json?rss_url=${magazine}`
    );
    const jsonObj = await magazineTopic.json();
    generateAccordionItems(jsonObj, count++);
  } catch (err) {
    alert`Error! Could not fetch!`;
  }
}

function generateAccordionItems(topic, count) {
  const accordionDiv = document.getElementById("accordionId");
  const accordionItem = document.createElement("div");
  accordionItem.className = "accordion-item";
  accordionDiv.appendChild(accordionItem); // appended item

  //accordion-header
  const h2 = document.createElement("h2");
  h2.className = "accordion-header";
  h2.id = `heading${count}`;
  accordionItem.appendChild(h2); // appended accordion-header

  //button
  const btn = document.createElement("button");
  btn.className = "accordion-button";
  if (count != 1) {
    btn.classList.add("collapsed");
  }
  btn.type = "button";
  btn.setAttribute("data-bs-toggle", "collapse");
  btn.setAttribute("data-bs-target", `#collapse${count}`);
  if (count == 1) {
    btn.setAttribute("aria-expanded", "true");
  } else {
    btn.setAttribute("aria-expanded", "false");
  }
  btn.setAttribute("aria-controls", `collapse${count}`);
  btn.innerHTML = `${topic["feed"]["title"]}`;
  btn.title = `${topic["feed"]["description"]}`;
  h2.appendChild(btn); // appended button

  //collapse body
  const collapse = document.createElement("div");
  collapse.id = `collapse${count}`;
  collapse.className = "accordion-collapse collapse";
  if (count == 1) {
    collapse.classList.add("show");
  }
  collapse.setAttribute("aria-labelledby", `heading${count}`);
  collapse.setAttribute("data-bs-parent", "#accordionId");
  accordionItem.appendChild(collapse); // appended collapse body

  //accordion-item body
  const body = document.createElement("div");
  body.className = "accordion-body";
  collapse.appendChild(body); // appended body

  //carousel
  const carousel = document.createElement("div");
  carousel.id = `carouselExampleControls${count}`;
  carousel.className = "carousel slide";
  carousel.setAttribute("data-bs-ride", "carousel");
  body.appendChild(carousel); // appended carousel

  //carousel-inner
  const inner = document.createElement("div");
  inner.className = "carousel-inner";
  carousel.appendChild(inner); // appended carousel-inner

  //carousel-item as a card
  topic["items"].forEach((item, counter) => {
    const caroItem = document.createElement("div");
    caroItem.className = "carousel-item card";
    if(counter == 0) {
      caroItem.classList.add("active");
    }
    inner.appendChild(caroItem); // appended carousel-item

    //carousel img & card-img-top
    const img = document.createElement("img");
    img.className = "card-img-top d-block w-100";
    img.alt = item.title;
    img.src = item["enclosure"].link;
    caroItem.appendChild(img); // appended carousel img

    //card-body
    const cardBody = document.createElement("div");
    cardBody.className = "card-body";
    caroItem.appendChild(cardBody); // appended card-body

    //card-body-anchor
    const anchor = document.createElement("a");
    anchor.href = `${item.link}`;
    anchor.className = "nav-link";
    anchor.target = "_blank";
    cardBody.appendChild(anchor); // appended anchor

    //card-body-text
    const bodyH3 = document.createElement("h3");
    bodyH3.className = "card-title";
    bodyH3.innerHTML = `${item.title}`;
    const bodyP = document.createElement("div");
    bodyP.className = "card-text";
    bodyP.innerHTML = `${item.description}`;
    anchor.append(bodyH3, bodyP); // appended card-body-text
  });

  //carousel-controls-prev
  const prevBtn = document.createElement("button");
  prevBtn.type = "button";
  prevBtn.className = "carousel-control-prev";
  prevBtn.setAttribute("data-bs-target", `#carouselExampleControls${count}`);
  prevBtn.setAttribute("data-bs-slide", "prev");
  prevBtn.innerHTML = `<span class="carousel-control-prev-icon" aria-hidden="true"></span>
  <span class="visually-hidden">Previous</span>`;
  carousel.appendChild(prevBtn); // appended prev button

  //carousel-controls-next
  const nextBtn = document.createElement("button");
  nextBtn.type = "button";
  nextBtn.className = "carousel-control-next";
  nextBtn.setAttribute("data-bs-target", `#carouselExampleControls${count}`);
  nextBtn.setAttribute("data-bs-slide", "next");
  nextBtn.innerHTML = `<span class="carousel-control-next-icon" aria-hidden="true"></span>
  <span class="visually-hidden">Next</span>`;
  carousel.appendChild(nextBtn); // appended next button
}