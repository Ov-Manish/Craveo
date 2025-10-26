import ImageKit ,{toFile} from '@imagekit/nodejs';
import dotenv from 'dotenv';
dotenv.config();
const client = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY, // This is the default and can be omitted
});


export const uploadFile = async(file, fileName)=>{ //buffer location and file (which is created by the uuid )
    const formattedFile = await toFile(file, fileName); // converting the the buffer to a proper file object    
    const result =  await client.files.upload({
        file : formattedFile,
        fileName : fileName
    })

    return result;
}

// const response = await client.files.upload({
//   file: fs.createReadStream('path/to/file'),
//   fileName: 'file-name.jpg',
// });



// console.log(response);