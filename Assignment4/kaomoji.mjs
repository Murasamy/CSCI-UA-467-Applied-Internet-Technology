// kaomoji.mjs
class Kaomoji{
    constructor(kaomoji, emotion){
        this.value = kaomoji;
        this.emotions = emotion;
    }

    isEmotion(emotion){
        return this.emotions.includes(emotion);
    }
}

// const kao = new Kaomoji("ಠ_ಠ", ["wat", "what", "confused"]);

export{
    Kaomoji,
};