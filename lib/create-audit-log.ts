import { auth, currentUser } from "@clerk/nextjs";
import { ACTION, ENTITY_TYPE } from "@prisma/client";

import { db } from "@/lib/db";

interface Props {
  entityId: string;
  entityType: ENTITY_TYPE;
  entityTitle: string;
  action: ACTION;
}

/**
 * Creates an audit log entry for a specific action performed by a user.
 * @param {Props} props - The properties for creating the audit log entry.
 * @returns {Promise<void>} - A promise that resolves when the audit log entry is created.
 */
export const createAuditLog = async (props: Props): Promise<void> => {
  try {
    const { orgId } = auth();
    const user = await currentUser();

    if (!user || !orgId) {
      throw new Error("Usuario no encontrado");
    }

    const { entityId, entityType, entityTitle, action } = props;

    await db.auditLog.create({
      data: {
        orgId,
        entityId,
        entityType,
        entityTitle,
        action,
        userId: user.id,
        userImage: user?.imageUrl,
        userName: user?.firstName + " " + user?.lastName,
      },
    });
  } catch (error) {
    console.log("[AUDIT_LOG_ERROR]", error);
  }
};
