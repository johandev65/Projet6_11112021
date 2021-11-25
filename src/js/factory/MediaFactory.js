export class Image {
    
    constructor(media) {
		this.photographer = media.photographerId;
		this.id = media.id;
		this.title = media.title;
		this.image = media.image;
		this.likes = media.likes;
		this.tags = media.tags;
		this.alt = media.alt;
        this.linkname = media.linkname
	}

    displayMediasList() {
        return `<figure class='media-card'>
                    <a class="media-card__picture" href='#' tabindex='0' onclick="openMedia()">
                        <img src="./assets/portfolios/${this.linkname}/${this.image}" alt="${this.alt}"/>
                    </a>
                    <figcaption class="media-card-infos">
                        <span class="media-card__title">${this.title}</span>
                        <span class="media-card__price">${this.price}€</span>
                        <div class="media-card__likes">
                            <span class="like-text">${this.likes}</span>
                            <i class="far fa-heart heart-btn" role="button" tabindex="0"></i>
                        </div>
                    </figcaption>
                </figure>`;
    }
}


export class Video {
    constructor(media) {
		this.photographer = media.photographerId;
		this.id = media.id;
		this.title = media.title;
		this.video = media.video;
		this.likes = media.likes;
	}

    displayMediasList() { 
        return `<figure class='media-card'>
                    <a class="media-card__picture" href='#' title="${this.title}" tabindex='0' onclick="openMedia()">
                        <video controls width="600">
                            <source src="/assets/portfolios/${this.linkname}/${this.video}" type="video/mp4" alt="${this.alt}" id="${this.id}" label="Français" kind="subtitles" srclang="fr">
                        </video>
                    </a>
                    <figcaption class="media-card-infos">
                        <span class="media-card__title">${this.title}</span>
                        <span class="media-card__price">${this.price}€</span>
                        <div class="media-card__likes">
                            <span class="like-text">${this.likes}</span>
                            <i class="far fa-heart heart-btn" role="button" tabindex="0"></i>
                        </div>
                    </figcaption>
                </figure>`;
      
    }
}