(async () => {
        const Items = require('./models/items')
        const mongoose = require('mongoose')
        const fs = require('fs/promises')
        const path = require('path')
        const db = require("./mongodb-conn");
        let dir = path.join(__dirname, 'export.json')
        const result = await fs.readFile(dir, 'utf8')
        let arr = JSON.parse(result)

        async function createItem(title, english_title, item_id, pickup_message, description, item_type, extra) {
            let itemDetails = {
                title,
                english_title,
                item_id,
                pickup_message,
                description,
                item_type,
                extra,
            }

            let NewItems = new Items(itemDetails)
            await NewItems.save();
            console.log("Inserted:",itemDetails);
        }

        await Items.deleteMany({});
        console.log("Database truncated.");
        for (const item of arr) {
            if (item.item_id===null){
                await createItem(
                    item.title,
                    item.english_title,
                    item.item_id,
                    item.pickup_message,
                    item.description,
                    item.item_type,
                    item.extra
                );
            }else{
                await createItem(
                    item.title,
                    item.english_title,
                    item.item_id.slice(8),
                    item.pickup_message,
                    item.description,
                    item.item_type,
                    item.extra
                );
            }


        }
        await db.close();
    }
)()



