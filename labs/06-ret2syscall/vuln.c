#include <stdio.h>
#include <string.h>
#include <unistd.h>

void vuln(void) {
    char buf[16];
    read(0, buf, 64);
}

int main(void) {
    vuln();
    return 0;
}
