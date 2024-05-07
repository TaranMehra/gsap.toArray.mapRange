import gsap  from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);


window.addEventListener('load', ()=>{
 const slide = gsap.utils.toArray('.pages');


  function getIntialTranslateZ(slide){
    const style =  window.getComputedStyle(slide);
    const matrix = style.transform.match(/matrix3d\((.+)\)/);

        if(matrix){
          const values = matrix[1].split(', ');
          return parseInt(values[14] || 0)
        }}





        function mapRange(value, inMin, inMax, outMin, outMax){
          return ((value - inMin) * (outMax - outMin)) / (inMax - inMin ) + outMin;
        }

slide.forEach((slide, index)=>{

  const initialZ = getIntialTranslateZ(slide);

  console.log(slide)

  ScrollTrigger.create({
    trigger:'.container',
    start:'top top',
    end:'bottom bottom',
    scrub: true,
    onUpdate:(self)=>{
      const progress = self.progress;
      const zIncrement = progress * 22500;
      const currentZ = initialZ + zIncrement;
      console.log(currentZ);

      let opacity;
      if(currentZ < -2500){
       
        // opacity = mapRange(currentZ, -2500, 0, 0.5, 1)
        opacity = gsap.utils.mapRange(-2500, 0, 0.5, 1, currentZ);

      }

      else {
        // opacity = mapRange(currentZ, -5000, -2500, 0, 0.5);
        opacity = gsap.utils.mapRange(-5000, -2500, 0, 0.5, currentZ)
      }

      slide.style.opacity = opacity;
      slide.style.transform = `translateX(-50%) translateY(-50%) translateZ(${currentZ}px)`



    }
  })


})
})
