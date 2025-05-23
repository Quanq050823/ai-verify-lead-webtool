"use strict";

import ApiError from "../utils/ApiError.js";
import { StatusCodes } from "http-status-codes";
import getObjectId from "../utils/getObjectId.js";
import NodeType from "../models/nodeType.js";
import uploadImg from "../utils/uploadFirebaseImg.js";
import Producer from "../config/rabbitMQ.js";

export const getAll = async () => {
    try {
        let nodeTypes = await NodeType.find();
        return nodeTypes || null;
    } catch (error) {
        throw error;
    }
};

export const getById = async (nodeTypeId) => {
    try {
        let nodeType = await NodeType.findById(getObjectId(nodeTypeId));
        return nodeType || null;
    } catch (error) {
        throw error;
    }
};

export const createNodeType = async (nodeType) => {
    try {
        let { name, key, img, description, fields } = nodeType;

        let existingNodeType = await NodeType.findOne({ name });
        if (existingNodeType) {
            throw new ApiError(StatusCodes.CONFLICT, "Node type with this name already exists");
        }

        let newNodeType = new NodeType({
            name,
            key,
            img,
            description,
            fields,
        });
        await newNodeType.save();

        await Producer.createExchange(key);
        await Producer.createQueue(`${key}.consumer`, key, `#`);

        return newNodeType;
    } catch (error) {
        throw error;
    }
};

export const updateNodeType = async (nodeTypeId, data) => {
    try {
        let nodeType = await NodeType.findById(getObjectId(nodeTypeId));
        if (!nodeType) {
            throw new ApiError(StatusCodes.NOT_FOUND, "Node type not found");
        }

        let uploadedImg = data?.img
            ? await uploadImg(data?.img, "nodeType", nodeType._id)
            : nodeType.img;

        nodeType.name = data.name || nodeType.name;
        nodeType.type = data.type || nodeType.type;
        nodeType.img = uploadedImg;
        nodeType.description = data.description || nodeType.description;
        nodeType.fields = data.fields || nodeType.fields;

        let result = await nodeType.save();

        return result || null;
    } catch (error) {
        throw error;
    }
};

export const deleteNodeType = async (nodeTypeId) => {
    try {
        let nodeType = await NodeType.findById(getObjectId(nodeTypeId));
        if (!nodeType) {
            throw new ApiError(StatusCodes.NOT_FOUND, "Node type not found");
        }

        let deletedNodeType = await NodeType.findByIdAndDelete(getObjectId(nodeTypeId));
        return deletedNodeType || null;
    } catch (error) {
        throw error;
    }
};

export const resetExchange = async () => {
    try {
        let nodeTypes = await NodeType.find();
        nodeTypes.forEach(async (nodeType) => {
            await Producer.createExchange(nodeType.key);
            await Producer.createQueue(`${nodeType.key}.consumer`, nodeType.key, `#`);
        });

        return { status: true, message: "Exchange reset successfully" };
    } catch (error) {
        throw error;
    }
};
