document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling za navigacijske linkove
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            let targetId = this.getAttribute('href');
            let targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70, // Podesite offset ako imate fiksni header
                    behavior: 'smooth'
                });
            }
        });
    });

    // Animacija naslova "Pazar u Džepu"
    const heroTitle = document.querySelector('.hero h1');
    if (heroTitle) {
        const titleText = "Pazar u Džepu";
        heroTitle.innerHTML = ''; // Očisti postojeći tekst
        let delay = 0;

        titleText.split('').forEach((char, index) => {
            const span = document.createElement('span');
            span.textContent = char;
            span.classList.add('char');
            span.style.transitionDelay = `${delay}s`;

            // Dodavanje klasa za boje
            if (index < 5) { // "Pazar"
                span.classList.add('pazar-color');
            } else if (index === 5) { // Razmak
                 span.classList.add('space-char');
            } else if (index === 6) { // "u"
                span.classList.add('u-color');
            } else if (index === 7) { // Razmak
                 span.classList.add('space-char');
            } else { // "Džepu"
                span.classList.add('dzepu-color');
            }
            
            heroTitle.appendChild(span);
            delay += 0.05; // Mali razmak u kašnjenju za svako slovo
        });

        // Pokreni animaciju nakon što su svi spanovi dodati
        setTimeout(() => {
            const chars = heroTitle.querySelectorAll('.char');
            chars.forEach(c => {
                c.style.opacity = '1';
                c.style.transform = 'translateY(0)';
            });
        }, 100);
    }

    // Animacije pri skrolovanju
    const scrollElements = document.querySelectorAll('.animate-on-scroll');

    const elementInView = (el, dividend = 1) => {
        const elementTop = el.getBoundingClientRect().top;
        return (
            elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend
        );
    };

    const displayScrollElement = (element) => {
        element.classList.add('is-visible');
    };

    const hideScrollElement = (element) => {
        element.classList.remove('is-visible');
    };

    const handleScrollAnimation = () => {
        scrollElements.forEach((el) => {
            if (elementInView(el, 1.25)) {
                displayScrollElement(el);
            } else {
                // Opciono: sakrij elemente kada nisu u vidokrugu da bi se animacija ponovila
                // hideScrollElement(el);
            }
        });
    }

    window.addEventListener('scroll', () => {
        handleScrollAnimation();
    });
    // Inicijalno pokretanje za elemente koji su već vidljivi
    handleScrollAnimation();

    // Dinamičko prikazivanje godine u footeru
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // Osnovna validacija forme za prijavu (ako nije Mailchimp)
    // Ako koristite Mailchimp, on ima svoju validaciju.
    // Ovaj dio je ostavljen kao primjer ako biste imali drugu formu.
   // Mailchimp form submission handler
const mailchimpForm = document.getElementById('mc-embedded-subscribe-form');
if (mailchimpForm) {
    mailchimpForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = new FormData(this);
        const submitBtn = this.querySelector('input[type="submit"]');
        
        // Show loading state
        submitBtn.value = 'Prijavljivanje...';
        submitBtn.disabled = true;
        
        // Submit via AJAX
        fetch(this.action, {
            method: 'POST',
            body: formData,
            mode: 'no-cors'
        })
        .then(() => {
            // Show success message
            const successDiv = document.getElementById('mce-success-response');
            successDiv.innerHTML = 'Hvala što ste se prijavili!';
            successDiv.style.display = 'block';
            
            // Reset form
            this.reset();
            submitBtn.value = 'Prijavi se';
            submitBtn.disabled = false;
        })
        .catch(() => {
            // Show error message
            const errorDiv = document.getElementById('mce-error-response');
            errorDiv.innerHTML = 'Došlo je do greške. Molimo pokušajte ponovo.';
            errorDiv.style.display = 'block';
            submitBtn.value = 'Prijavi se';
            submitBtn.disabled = false;
        });
    });
}

    function isValidEmail(email) {
        // Jednostavna regex provjera za email
        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return emailRegex.test(String(email).toLowerCase());
    }
});
