import './NotFound.css'

export default function NotFound ({image}) {
    return(
        <div>
            {image === "noimage" ? 
            <img className='notfound-404' src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fres.cloudinary.com%2Fteepublic%2Fimage%2Fprivate%2Fs--79EwJk3z--%2Ft_Preview%2Fb_rgb%3A000000%2Cc_limit%2Cf_auto%2Ch_630%2Cq_90%2Cw_630%2Fv1608236443%2Fproduction%2Fdesigns%2F17519845_0.jpg&f=1&nofb=1&ipt=855562d4579b88ad0fc908762559011c143f114248778a5ae425d90a2728f1a8&ipo=images" alt="Not Found"/> :
            <img src="https://png.pngtree.com/png-vector/20210827/ourmid/pngtree-error-404-page-not-found-png-image_3832696.jpg" alt="Not Found"/> }
        </div>
    )
}