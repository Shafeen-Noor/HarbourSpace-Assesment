let state = {
    scholarship: {
        name: '',
        description: '',
        about: '',
        start_date: '',
        end_date: '',
        location: '',
        duration: '',
        tuition: '',
        total_value: '',
        stipend_per_month: '',
        stipend_per_year: '',
        remaining: '',
        study_commitment: '',
        internship_commitment: '',
        work_commitment: '',
        study_commitment_text: '',
        internship_commitment_text: '',
        work_commitment_duration: '',
        work_commitment_type: '',

    },
    program: {
        animationData: null,
    },
    company: {
        name: '',
        logo: null,
    },
    faq: {
        items: ''
    },

};

async function fetchData() {
    try {
        const response = await fetch('https://pre-prod.harbour.space/api/v1/scholarship_pages/data-science-apprenticeship-zeptolab');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

document.addEventListener('DOMContentLoaded', async function () {
    try {
        const data = await fetchData();

        state.scholarship.name = data.scholarship.name;
        state.scholarship.description = data.scholarship.description[0].data;
        state.scholarship.about = data.scholarship.about[0].data;
        state.scholarship.location = data.scholarship.location.name;
        state.scholarship.duration = data.scholarship.duration;
        state.scholarship.start_date = data.scholarship.scholarship_start_date;
        state.scholarship.end_date = data.scholarship.application_end_date;
        state.scholarship.total_value = data.scholarship.total_value;
        state.scholarship.tuition = data.scholarship.tuition;
        state.scholarship.stipend_per_month = data.scholarship.stipend_per_month;
        state.scholarship.stipend_per_year = data.scholarship.stipend_per_year;
        state.scholarship.remaining = data.scholarship.remaining;
        state.scholarship.study_commitment = data.scholarship.study_commitment;
        state.scholarship.study_commitment_text = data.scholarship.study_commitment_text;
        state.scholarship.internship_commitment = data.scholarship.internship_commitment;
        state.scholarship.internship_commitment_text = data.scholarship.internship_commitment_text;
        state.scholarship.work_commitment = data.scholarship.work_commitment;
        state.scholarship.work_commitment_type = data.scholarship.work_commitment_type;
        state.scholarship.work_commitment_duration = data.scholarship.work_commitment_duration;

        state.program.animationData = JSON.parse(data.scholarship.program.json_logo);
        state.company.logo = data.scholarship.company.color_logo;
        state.company.name = data.scholarship.company.name;
        state.faq = data.scholarship.faqs;

        renderUI();
    } catch (error) {
        console.error('Error:', error);
    }
});

function renderUI() {
    const scholarshipNameElement = document.getElementById('scholarship-name');
    const scholarshipDescriptionElement = document.getElementById('scholarship-description');
    const scholarshipAboutElement = document.getElementById('about');
    const animationContainer = document.getElementById('animation-container');
    const companyLogoContainer = document.getElementById('company_logo');
    const companyNameContainer = document.getElementById('company_name');
    const companyName = document.getElementById('th');

    const dropdownButton = document.querySelector('.dropdown-toggle');
    const dropdownMenu = document.querySelector('.dropdown-menu');

    const location = document.getElementById('location');
    const d1 = document.getElementById('d1');

    const duration = document.getElementById('duration');
    const d2 = document.getElementById('d2');

    const startdate = document.getElementById('startdate');
    const d3 = document.getElementById('d3');

    const enddate = document.getElementById('enddate');
    const d4 = document.getElementById('d4');


    const totalval = document.getElementById('totalval');
    const tuition = document.getElementById('tuition');
    const liv_exp_mon = document.getElementById('liv_exp_mon');
    const remain = document.getElementById('remain');
    const study_com = document.getElementById('study-com');
    const study_text = document.getElementById('study_text');
    const intern_com = document.getElementById('intern-com');
    const intern_text = document.getElementById('intern-text');
    const work_com = document.getElementById('work-com');
    const work_dur = document.getElementById('work-dur');

    scholarshipNameElement.textContent = state.scholarship.name;
    scholarshipDescriptionElement.textContent = state.scholarship.description;
    scholarshipAboutElement.textContent = state.scholarship.about;
    companyNameContainer.textContent = state.company.name;
    companyName.textContent = state.company.name;
    location.textContent = state.scholarship.location;
    d1.textContent = state.scholarship.location;

    duration.textContent = state.scholarship.duration;
    d2.textContent = state.scholarship.duration;

    startdate.textContent = state.scholarship.start_date;
    d3.textContent = state.scholarship.start_date;

    enddate.textContent = state.scholarship.end_date;
    d4.textContent = state.scholarship.end_date;

    totalval.textContent = "€" + state.scholarship.total_value;
    tuition.textContent = "€" + state.scholarship.tuition;
    liv_exp_mon.textContent = "€" + state.scholarship.stipend_per_year + "(" + state.scholarship.stipend_per_month + "per month)";
    remain.textContent = "€" + state.scholarship.remaining;
    study_com.textContent = state.scholarship.study_commitment + " hours/day";
    study_text.textContent = state.scholarship.study_commitment_text;
    console.log(state.scholarship.study_commitment_text);
    intern_com.textContent = state.scholarship.internship_commitment + " hours/day";
    intern_text.textContent = state.scholarship.internship_commitment_text;
    work_com.textContent = state.scholarship.work_commitment + " Years /" + state.scholarship.work_commitment_type;
    work_dur.textContent = state.scholarship.work_commitment_duration;

    // Render the animation using Lottie
    if (state.program.animationData && animationContainer) {
        const anim = lottie.loadAnimation({
            container: animationContainer,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            animationData: state.program.animationData
        });
    }

    // Render the company logo
    if (state.company.logo && companyLogoContainer) {
        companyLogoContainer.src = state.company.logo.src;
        companyLogoContainer.alt = 'Company Logo';
        companyLogoContainer.classList.add('img-fluid');
    }

    // Extract unique types
    const uniqueTypes = [...new Set(state.faq.items.map(item => item.type))];
    // Render dropdown menu items

    if (dropdownMenu) {
        dropdownMenu.innerHTML = ''; // Clear existing dropdown menu items

        // Render accordion items for the first type as default
        renderAccordionItems(uniqueTypes[0]);

        // Render dropdown menu items
        uniqueTypes.forEach(type => {
            const listItem = document.createElement('li');
            const link = document.createElement('a');
            link.classList.add('dropdown-item');
            link.textContent = type;
            link.addEventListener('click', () => renderAccordionItems(type));
            listItem.appendChild(link);
            dropdownMenu.appendChild(listItem);
        });
    }

    function renderAccordionItems(type) {
        const accordion = document.getElementById('accordionFlushExample');
        accordion.innerHTML = '';

        // Filter FAQ items by selected type
        const itemsOfType = state.faq.items.filter(item => item.type === type);

        // Render accordion items for filtered FAQ items
        itemsOfType.forEach((item, index) => {
            const accordionItem = document.createElement('div');
            accordionItem.classList.add('accordion-item');

            const header = document.createElement('h2');
            header.classList.add('accordion-header');
            header.innerHTML = `
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                    data-bs-target="#flush-collapse${index}" aria-expanded="false"
                    aria-controls="flush-collapse${index}">
                    <div class="col-4"><h4 class="d-inline flex-grow-1 pe-5">${item.type}</h4></div>
                    <div class="col-7">${item.question}</div>
                    <div class="col-1 text-end animation-button">
                        <i class="fa fa-plus btn icon rounded-circle" aria-hidden="true"></i>
                    </div>
                </button>
            `;

            const collapse = document.createElement('div');
            collapse.id = `flush-collapse${index}`;
            collapse.classList.add('accordion-collapse', 'collapse');
            collapse.setAttribute('aria-labelledby', `flush-heading${index}`);

            const body = document.createElement('div');
            body.classList.add('accordion-body', 'd-flex', 'justify-content-end');
            body.innerHTML = `<div class="col-9">${item.answer[0].data}</div>`;
            // Add event listeners to toggle collapse state for each accordion item
            header.addEventListener('click', () => {
                const icon = header.querySelector('i.fa');
                // Toggle plus and minus icons
                icon.classList.toggle('fa-plus');
                icon.classList.toggle('fa-minus');
            });

            collapse.appendChild(body);

            accordionItem.appendChild(header);
            accordionItem.appendChild(collapse);
            accordion.appendChild(accordionItem);
        });
    }

    var swiper = new Swiper(".mySwiper", {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        effect: 'slide',
        speed: 1000,
        freeModeMomentumVelocityRatio: 4,
        freeModeMomentumBounce: true,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        breakpoints: {
            // When window width is <= 768px (for mobile)
            768: {
                slidesPerView: 3,
                spaceBetween: 10, 
                effect: 'slide',
                speed: 1000, 
                freeModeMomentumVelocityRatio: 4, 
                freeModeMomentumBounce: true,
                pagination: {
                    el: ".swiper-pagination",
                    clickable: true,
                },
            },

        }
    });

    (function () {
        const cursor = document.querySelector('.custom-cursor');
        const overlay = document.querySelector('.overlay');

        gsap.set(cursor, {
            xPercent: -50,
            yPercent: -50,
            display: 'none', // Initially hide the custom cursor
        });

        overlay.addEventListener('mouseenter', function () {
            cursor.style.display = 'block'; // Show custom cursor when mouse enters overlay
        });

        overlay.addEventListener('mouseleave', function () {
            cursor.style.display = 'none'; // Hide custom cursor when mouse leaves overlay
        });

        document.addEventListener('pointermove', moveCursor);

        function moveCursor(e) {
            gsap.to(cursor, {
                duration: 0.5,
                x: e.clientX,
                y: e.clientY,
            });
        }
    })();

}
