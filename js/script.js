document.addEventListener('DOMContentLoaded', (event) => {
    const companyElement = document.getElementById("company-name");
    const projectElement = document.getElementById("project-link");

    const companyAnnotation = RoughNotation.annotate(companyElement, { type: 'highlight', color: '#fab700'});
    const projectAnnotation = RoughNotation.annotate(projectElement, { type: 'highlight', color: '#1E90FF'});

    companyAnnotation.show();

    setTimeout(() => {
        projectAnnotation.show();
    }, 1000);

    const skillProgressBars = document.querySelectorAll('.skills progress');
    const languageProgressBars = document.querySelectorAll('.languages progress');

    function animateProgressBar(progress) {
        return new Promise((resolve) => {
            const value = progress.getAttribute('data-value');
            let start = 0;
            const duration = 1000;
            const startTime = performance.now();

            function animate() {
                const elapsedTime = performance.now() - startTime;
                start = Math.min((elapsedTime / duration) * value, value);
                progress.value = start;

                if (elapsedTime < duration) {
                    requestAnimationFrame(animate);
                } else {
                    progress.value = value;
                    resolve();
                }
            }

            requestAnimationFrame(animate);
        });
    }

    async function animateAllProgressBars(progressBars) {
        for (const progress of progressBars) {
            await animateProgressBar(progress);
        }
    }

    animateAllProgressBars(skillProgressBars);
    animateAllProgressBars(languageProgressBars);
});
