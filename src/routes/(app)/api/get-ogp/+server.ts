import ogp from 'ogp-parser';
import sharp from 'sharp';

type result = {
    title: string,
    description: string,
    image: string,
    imageBlob: Blob | string,
}

async function ogpParser(uri: string) {
    const res = await ogp(uri, { skipOembed: true }).then(function(data) {
        return data;
    }).catch(function(error) {
        throw new Error(error);
    });

    const image = res?.ogp['og:image'] ? res?.ogp['og:image'][0] : '';
    let blob;
    if (image) {
        try {
            /* const orig = await fetch(image).then(r => r.arrayBuffer());
            const compress = await sharp(orig)
                .resize({
                    width: 512,
                    height: 512,
                    fit: 'inside',
                })
                .jpeg({ mozjpeg: false })
                .timeout({ seconds: 3 })
                .toBuffer({ resolveWithObject: true });
            blob = new Blob([compress.data], {type: 'image/jpeg'}); */
            blob = await fetch(image).then(r => r.blob());
        } catch (e) {
            console.error(e);
            blob = '';
        }
    }

    return {
        title: res.title,
        description: res?.seo.description ? res.seo.description[0] : '',
        image: res?.ogp['og:image'] ? res?.ogp['og:image'][0] : '',
        imageBlob: blob || '',
    };
}

export async function POST ({ request }) {
    if (request.method === 'POST') {
        const textObj = await request.json();

        try {
            const result: result = await ogpParser(textObj.uri);

            const formData = new FormData();
            formData.append('title', result.title);
            formData.append('description', result.description);
            formData.append('image', result.image);
            formData.append('imageBlob', result.imageBlob);

            return new Response(formData, { status: 200 });
        } catch (e) {
            console.log(e)
            return new Response(e.message, {status: 400});
        }
    }
}
