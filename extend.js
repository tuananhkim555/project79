//button

const button = document.getElementById('showmore');

  button.addEventListener('mousedown', () => {
    button.classList.add('active');
    setTimeout(() => {
      button.classList.remove('active');
    }, 2000); // 2000ms = 2s
  });

  button.addEventListener('mouseup', () => {
    setTimeout(() => {
      button.classList.remove('active');
    }, 2000); // 2000ms = 2s
  });

  button.addEventListener('mouseleave', () => {
    setTimeout(() => {
      button.classList.remove('active');
    }, 2000); // 2000ms = 2s
  });

  button.addEventListener('touchstart', () => {
    button.classList.add('active');
    setTimeout(() => {
      button.classList.remove('active');
    }, 2000); // 2000ms = 2s
  });

  button.addEventListener('touchend', () => {
    setTimeout(() => {
      button.classList.remove('active');
    }, 2000); // 2000ms = 2s
  });

//Review slider
document.getElementById('next_review').onclick = function(){
  let lists = document.querySelectorAll('.item_review');
  document.getElementById('slider-image').appendChild(lists[0]);
}

document.getElementById('prev_review').onclick = function(){
  let lists = document.querySelectorAll('.item_review');
  document.getElementById('slider-image').prepend(lists[lists.length - 1]);
}


//Modal

document.addEventListener('DOMContentLoaded', () => {
  const openModalButtons = document.querySelectorAll('.btnBooking');
  const modal = document.getElementById('registerModal');
  const closeModal = document.querySelector('.close');
  const registerForm = document.getElementById('registerForm');
  const successMessage = document.getElementById('successMessage');
  const closeSuccessMessageBtn = document.getElementById('closeSuccessMessage');

  openModalButtons.forEach(button => {
      button.addEventListener('click', () => {
          modal.style.display = 'block';
      });
  });

  closeModal.addEventListener('click', () => {
      modal.style.display = 'none';
      registerForm.style.display = 'block';
      successMessage.style.display = 'none';
  });

  closeSuccessMessageBtn.addEventListener('click', () => {
      modal.style.display = 'none';
      registerForm.reset();
  });

  window.addEventListener('click', (event) => {
      if (event.target === modal) {
          modal.style.display = 'none';
          registerForm.style.display = 'block';
          successMessage.style.display = 'none';
      }
  });

  registerForm.addEventListener('submit', (event) => {
      event.preventDefault();

      const formData = new FormData(registerForm);
      const data = {
          name: formData.get('name'),
          phone: formData.get('phone'),
          email: formData.get('email'),
          message: formData.get('message')
      };

      emailjs.send('service_fg2qp7p', 'template_6o44yx7', data)
          .then(response => {
              registerForm.style.display = 'none';
              successMessage.style.display = 'block';
          })
          .catch(error => {
              console.error('Error:', error);
              alert('Có lỗi xảy ra, vui lòng thử lại sau.');
          });
  });
});

//BackGround

particlesJS("background", {

  particles: {
      number: {
          value: 15, // Number of Particles(count)
          density: {
              enable: true,
              value_area: 300, // Area where particles will be distributed
          },
      },

      color: {
          value: "#C0C0C0", // Particles color
      },
      shape: {
          type: "triangle", // shape type
      },
      opacity: {
          value: 0.8, // Base opacity of particles
          random: true,
          anum: {
              enable: true,
              speed: 1,
              opacity_min: 0.1,
              sync: false,
          },
      },
      size: {
          value: 5, // Base size of particles
          random: true,
          anim: {
              enable: true,
              speed: 4,
              size_min: 0.3,
              sync: false,
          },
      },

      //Connecting lines
      line_linked: {
          enable: true,
          distance: 150, //Maximin distance between linked particles
          color: "#C0C0C0",
          opacity: 0.4,
          width: 1,
      },
      //Particles movement
      move: {
          enable: true,
          speed: 2,
          direction: "none",
          random: false,
          straight: false,
          out_mode: "bounce", //Behavior when particles move out of the canvas
          bounce: false,
      },
  },
  //Interactivity settings
      interactivity: {
          detect_on: "canvas",
          events: {
              onhover: {
                  enable: true, // Enable hover interactivity
                  mode: "repulse",
              },
              onclick: {
                  enable: true, //Enable for click
                  mode: "push", //Push particles on click
              },
              resize: true, //Resize particles animation on window resize
          },
      },
      // Detect retina displays
      retina_detect: true,

});

