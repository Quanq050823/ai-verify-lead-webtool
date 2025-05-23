import amqp from "amqplib";
import config from "./environment.js";
import chalk from "chalk";
import { v4 as uuidv4 } from "uuid";

class Producer {
    static channel;

    static async createChannel() {
        if (!this.channel) {
            try {
                const connection = await amqp.connect(config.rabbitMQURL);
                this.channel = await connection.createChannel();
                console.log(chalk.blueBright("✅ Connected to RabbitMQ"));
            } catch (error) {
                console.error("❌ RabbitMQ Connection Error:", error);
            }
        }
        return this.channel;
    }

    static async createExchange(exchange, type = "topic") {
        const channel = await this.createChannel();
        await channel.assertExchange(exchange, type, { durable: true });
    }

    static async createQueue(queue, exchange, routingKey) {
        const channel = await this.createChannel();
        await channel.assertQueue(queue, { durable: true, autoDelete: false, exclusive: false });
        await channel.bindQueue(queue, exchange, routingKey);
    }

    static async deleteQueue(queue, exchange) {
        const channel = await this.createChannel();
        await channel.unbindQueue(queue, exchange, queue);
        await channel.deleteQueue(queue);
    }

    static async publishMessage(exchange, routingKey, message) {
        const channel = await this.createChannel();
        const payload = JSON.stringify({
            routingKey,
            data: message,
            dateTime: new Date().toISOString(),
        });

        channel.publish(exchange, routingKey, Buffer.from(payload), {
            contentType: "application/json",
            contentEncoding: "utf-8",
        });
        console.log(
            `📤 Message sent: ${message} | Exchange: ${exchange} | Routing Key: ${routingKey}`
        );
    }

    static async publishToCelery(exchange, routingKey, message, task) {
        const channel = await this.createChannel();
        const payload = {
            id: uuidv4(),
            task: task,
            args: [],
            kwargs: {
                message,
            },
            retries: 0,
            eta: null,
        };

        // console.log(payload);

        channel.publish(exchange, routingKey, Buffer.from(JSON.stringify(payload)), {
            contentType: "application/json",
            contentEncoding: "utf-8",
        });

        console.log(
            `📤 Message sent: ${message} | Exchange: ${exchange} | Routing Key: ${routingKey}`
        );
    }
}

export default Producer;
