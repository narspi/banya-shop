document.addEventListener("DOMContentLoaded", () => {
  const menu = document.querySelectorAll(".nav__item");
  const mainItems = document.querySelectorAll(".main__images-slider");
  const scrollItems = document.querySelectorAll('.filter__accardion-fieldset');
  const scrollItemsArr = [];
  mainItems.forEach((item) => {
    new Swiper(item, {
      loop: true,
      pagination: {
        el: ".swiper-pagination",
        bulletElement: "button",
        clickable: true,
      },
    });
  });
  const menuArr = [...menu];
  console.log(
    menuArr.filter((item) => {
      return getComputedStyle(item).display === "none" ? true : false;
    })
  );

  scrollItems.forEach(item=>{
    item.classList.remove('overflow-hidden');
    scrollItemsArr.push(new SimpleBar(item,{ 
      autoHide: false 
    }));
  })

  console.log(scrollItemsArr)

  const filter = document.getElementById("filter");

  const clickAccardionFoo = (btn) => {
    btn.classList.toggle("down");
    const dropdown = btn.parentNode.nextElementSibling;
    const style = getComputedStyle(dropdown);
    const visibility = style.visibility;
    if (visibility === "hidden") {
      dropdown.style.height = "";
      const height = style.height;
      dropdown.dataset.animation = "up";
      dropdown.style.height = "0px";
      setTimeout(() => {
        dropdown.style.transition = "height 1s";
        dropdown.style.height = height;
        dropdown.style.visibility = "";
        dropdown.addEventListener(
          "transitionend",
          () => {
            dropdown.style.height = "";
            dropdown.style.transition = "";
          },
          { once: true }
        );
      },10);
    } else {
      dropdown.style.transition = "height 1s";
      const animationEffect = dropdown.dataset.animation;
      if (animationEffect === "up") {
        const height = style.height;
        dropdown.style.height = height;
        dropdown.dataset.animation = "down";
        setTimeout(() => {
          dropdown.style.height = "0px";
          dropdown.addEventListener(
            "transitionend",
            () => {
              dropdown.style.visibility = "hidden";
              dropdown.style.height = "0px";
              dropdown.style.transition = "";
            },
            { once: true }
          );
        },10);
      }
      if (animationEffect === "down") {
        dropdown.style.transition = "height 1s";
        const currentHeight = dropdown.clientHeight;
        dropdown.style.height = "";
        const height = style.height;
        dropdown.dataset.animation = "up";
        dropdown.style.height = `${currentHeight}px`;
        setTimeout(() => {
          dropdown.style.height = height;
          dropdown.addEventListener(
            "transitionend",
            () => {
              dropdown.style.visibility = "";
              dropdown.style.height = "";
              dropdown.style.transition = "";
            },
            { once: true }
          );
        },10);
      }
    }
  };

  const toggleFieldset = (fieldset,btn) => {
    const toggle = btn.dataset.toggle;
    const index = scrollItemsArr.findIndex((item)=>item.el === fieldset);
    if (toggle === 'open') {
      scrollItemsArr[index].unMount();
      btn.dataset.toggle = 'hide';
      btn.textContent = "Свернуть";
      const simplebarContent = fieldset.querySelector('.simplebar-content');
      const height = simplebarContent.clientHeight;
      fieldset.style.maxHeight = `${height}px`;
    } else {
      scrollItemsArr[index].unMount();
      btn.dataset.toggle = 'open';
      btn.textContent = "Посмотреть всё";
      fieldset.style.maxHeight = '200px';
    }
  }

  const clickCheckOne = (target) => {
    const fieldset = target.closest('.filter__accardion-fieldset');
    const checked = target.checked;
    if (checked === true) {
      const inputsChecked = fieldset.querySelectorAll('input:checked');
      const anotherInputChecked = [...inputsChecked].find(item=>item !== target);
      if (anotherInputChecked) anotherInputChecked.checked = false;
    }
  };

  filter.addEventListener("click", (event) => {
    const target = event.target;
    if (target.closest(".filter__accardion-btn")) {
      const btn = target.closest(".filter__accardion-btn");
      clickAccardionFoo(btn);
    }

    if (target.classList.contains('filter__show-everything')) {
      const fieldset = target.previousElementSibling;
      const btn = target;
      toggleFieldset(fieldset,btn);
    }

    if (target.classList.contains('filter__accardion-check') && target.classList.contains('check-one')) {
      clickCheckOne(target);
    }
  });
});
