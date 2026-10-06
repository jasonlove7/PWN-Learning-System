#include <stdio.h>
#include <string.h>

int main(void) {
    unsigned char buf[32];
    unsigned char code[] = {
        0xb8, 0x42, 0x00, 0x00, 0x00,
        0xc3
    };

    memcpy(buf, code, sizeof(code));

    int (*fn)(void) = (int (*)(void))buf;
    int result = fn();

    printf("result=%d\n", result);
    return 0;
}
