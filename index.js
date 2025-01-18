let initialPoints = { x: 0, y: 0 };
let finalPoints = { x: 0, y: 0 };
const smooth = { x: 0, y: 0 };
const velocity = { x: 0, y: 0 };
const imageUrl = gsap.utils.random([
    './images/4.jpeg',
    './images/8.jpeg',
    './images/9.jpeg',
    './images/11.jpeg',
    './images/12.jpeg',
    './images/13.jpeg',
    './images/png1.png',
], true)


// function lerp(x, y, a) {
//     return x * (1 - a) + y * a;
// }

function lerp(start, end, alpha) {
    return start * (1 - alpha) + end * alpha;
}

window.addEventListener('DOMContentLoaded', () => {

    let time = 0;

    window.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e
        initialPoints.x = clientX
        initialPoints.y = clientY

        const distance = Math.sqrt(
            Math.pow((finalPoints.x - initialPoints.x), 2) +
            Math.pow((finalPoints.y - initialPoints.y), 2)
        )

        const current = Date.now();
        if (distance > 80
            && (current - time) > 90
        ) {

            time = Date.now();
            const img = new Image()
            img.src = imageUrl()

            gsap.set(img, {
                height: 126,
                width: 226,
                position: 'absolute',
                xPercent: -50,
                yPercent: -50,
                // top: initialPoints.y + velocity.y * 0.5,
                // left: initialPoints.x + velocity.x * 0.5,
                top: initialPoints.y,
                left: initialPoints.x,
                pointerEvents: 'none',
                opacity: 1,
                scale: 1,
                borderRadius: '15px',
                clipPath: 'circle(13px at center)',
                willChange: 'transform',
            });


            const tl = gsap.timeline();

            tl.to(img, {
                clipPath: 'circle(100% at center)', // Expand the circular clip to cover the image.
                duration: 0.9,
                // opacity:2,
                ease: "power1.out",
            })
            tl.from(img, {
                // x: -velocity.x,
                // y: -velocity.y,
                // duration: 2,
                x: -velocity.x * 0.8,
                y: -velocity.y * 0.8,
                duration: 1,
                ease: 'power3.out',
            }, '<')
            tl.to(img, {
                // scale: 0,
                // opacity: 0,
                // duration: 1.5,
                opacity: 0,
                duration: 1,
                ease: 'power2.inOut',
            },
                '-=0.5'
            )

            document.body.appendChild(img)

            finalPoints.x = initialPoints.x
            finalPoints.y = initialPoints.y
        }
    })
    gsap.ticker.add(tick)
    function tick() {
        const lerpAlpha = 1;

        smooth.x = lerp(smooth.x, finalPoints.x, lerpAlpha)
        smooth.y = lerp(smooth.y, finalPoints.y, lerpAlpha)

        velocity.x = initialPoints.x - smooth.x
        velocity.y = initialPoints.y - smooth.y
    }
})
