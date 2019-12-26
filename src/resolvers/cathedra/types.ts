import {Image} from "../../database/models";
import log from "../../lib/logger";
import _ from "lodash";

export default {
  cathedra: {
    images: async (parent: any, args: any, context: any) => {
      try {
        const images = await Image.findAll({where: {owner: parent.id}});
        if (!images) return [];
        return _.map(images, image =>
          _(image)
            .pick(image, ["path"])
            .value()
        );
      } catch (error) {
        log.error(error.message, {path: __filename, object: "images"});
        return [];
      }
    }
  },
  cathedraRes: {
    __resolveType(obj: any, context: any, info: any): string | null {
      if (obj.message || obj.error) {
        return "result";
      }

      if (obj.id) {
        return "cathedra";
      }

      return null;
    }
  }
};
