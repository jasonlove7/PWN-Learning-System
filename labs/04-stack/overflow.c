#include <stdio.h>
#include <string.h>

void vuln(const char *input) {
    char buf[16];
    strcpy(buf, input);
}

int main(void) {
    char input[64];
    if (fgets(input, sizeof(input), stdin) == NULL) {
        return 1;
    }
    vuln(input);
    puts("done");
    return 0;
}
