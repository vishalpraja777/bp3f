const SocialMediaLinks = () => {

    const shareOnSocialMedia = (platform) => {
        const url = window.location.href;
        let shareLink = "";
        switch (platform) {
            case "facebook":
                shareLink = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
                break;
            case "whatsapp":
                shareLink = `https://api.whatsapp.com/send?text=${encodeURIComponent(url)}`;
                break;
            case "instagram":
                shareLink = `https://www.instagram.com/?url=${encodeURIComponent(url)}`;
                break;
            case "twitter":
                shareLink = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}`;
                break;
            default:
                break;
        }
        window.open(shareLink, "_blank");
    }

    return (
        <div className="socialLinks">
            <h3>Share On Social Media</h3>
            <i className="fa-brands fa-facebook-f socialMediaBtn fb" onClick={() => shareOnSocialMedia("facebook")}></i>
            <i className="fa-brands fa-instagram socialMediaBtn ig" onClick={() => shareOnSocialMedia("instagram")}></i>
            <i className="fa-brands fa-whatsapp socialMediaBtn wa" onClick={() => shareOnSocialMedia("whatsapp")}></i>
            <i className="fa-brands fa-twitter socialMediaBtn tw" onClick={() => shareOnSocialMedia("twitter")}></i>
            {/* <button className="signupBtn btn" onClick={() => shareOnSocialMedia("facebook")}>Share on Facebook</button> */}
            {/* <button className="signupBtn btn" onClick={() => shareOnSocialMedia("whatsapp")}>Share on WhatsApp</button> */}
            {/* <button className="signupBtn btn" onClick={() => shareOnSocialMedia("instagram")}>Share on Instagram</button> */}
            {/* <button className="signupBtn btn" onClick={() => shareOnSocialMedia("twitter")}>Share on Twitter</button> */}
        </div>
    );
}

export default SocialMediaLinks;