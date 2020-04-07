import cv2

def main():
    camera = cv2.VideoCapture(0)
    camera.set(3, 640)
    camera.set(4, 480)

    cv2.flip(camera, flipCode=-1)

    while( camera.isOpened()):
        _, image = camera.read()

        # image_r = cv2.flip(image, flipCode=-1)

        cv2.imshow('Original', image_r)

        b_w_image = cv2.cvtColor(image_r, cv2.COLOR_BGR2GRAY)
        cv2.imshow('B/W', b_w_image)

        if cv2.waitKey(1) & 0xFF == ord('q') :
            break

    cv2.destroyAllWindows()

if __name__ == '__main__':
    main()
